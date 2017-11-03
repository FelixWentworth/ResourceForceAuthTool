var gulp = require("gulp");
var jshint = require("gulp-jshint");
var concat = require("gulp-concat");
var inject = require("gulp-inject");
var eventStream = require("event-stream");
var del = require("del");
var angularTemplateCache = require("gulp-angular-templatecache");
var angularFileSort = require("gulp-angular-filesort");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var cssUseref = require("gulp-css-useref");
var gulpif = require("gulp-if");
var filter = require("gulp-filter");
var uglify = require("gulp-uglify");
var cleanCSS = require("gulp-clean-css");
var hash = require("gulp-hash-filename");
var rename = require("gulp-rename");

/*============================================
PROJECT CONFIGURATION   
============================================*/
var config = {
	index: "index.html",	
	app: {
		root: "app",
		scripts: "app/**/*.js",
		styles: "app/**/*.css",
		templates: "app/**/*.html",
	},
	dev: {
		vendor: {
			scripts: [
				"node_modules/jquery/dist/jquery.js",
				"node_modules/angular/angular.js",
				"node_modules/angular-ui-router/release/angular-ui-router.js",
				"node_modules/angular-animate/angular-animate.js",
				"node_modules/angular-aria/angular-aria.js",
				"node_modules/angular-material/angular-material.js",
				"node_modules/angular-messages/angular-messages.js",
				"node_modules/angular-cookies/angular-cookies.js",
				"node_modules/angular-uuid/angular-uuid.js"
			],
			styles: [
				"node_modules/angular-material/angular-material.css",
				"node_modules/material-design-icons/iconfont/material-icons.css"
			]
		},
		sourcemaps: true,
		bundle: false,
		minifyScripts: false,
		minifyCss: false,
		hash: false,
		output: {
			app: "../server/PlayGen.ResourceForceAuthoringTool.WebAPI/wwwroot/app",
			vendor: "../server/PlayGen.ResourceForceAuthoringTool.WebAPI/wwwroot/vendor",
		}		
	},
	prod: {
		vendor: {
			scripts: [
				"node_modules/jquery/dist/jquery.min.js",
				"node_modules/angular/angular.min.js",
				"node_modules/angular-ui-router/release/angular-ui-router.min.js",
				"node_modules/angular-animate/angular-animate.min.js",
				"node_modules/angular-aria/angular-aria.min.js",
				"node_modules/angular-material/angular-material.min.js",
				"node_modules/angular-messages/angular-messages.min.js",
				"node_modules/angular-cookies/src/angular-cookies.js",
				"node_modules/angular-uuid/angular-uuid.js"
			],
			styles: [
				"node_modules/angular-material/angular-material.min.css",
				"node_modules/material-design-icons/iconfont/material-icons.css"
			]
		},
		sourcemaps: false,
		bundle: true,
		minifyScripts: true,
		minifyCss: true,
		hash: true,
		output: {
			app: "../server/PlayGen.ResourceForceAuthoringTool.WebAPI/wwwroot",
			vendor: "../server/PlayGen.ResourceForceAuthoringTool.WebAPI/wwwroot",
		}	
	},
	build: {
		hashFormat: "{name}.{hash}.{ext}",
		output: "../server/PlayGen.ResourceForceAuthoringTool.WebAPI/wwwroot",
		babelPreset: "es2015"		
	},
	devTools: {
		esversion: 6
	}
};

/*============================================
ACTIVE CONFIG
============================================*/
var activeConfig = null

function setDev(done) {
	activeConfig = config.dev;
	done();
}

function setProd(done) {
	activeConfig = config.prod;
	done();
}

/*============================================
STREAMS
============================================*/
function clean() {
 	return del([config.build.output + "/*"], { force: true });
}

function validateJs() {
	return gulp.src(config.app.scripts)
		.pipe(jshint({esversion: config.devTools.esversion}))
		.pipe(jshint.reporter("jshint-stylish"));
};

function appScripts() {
	return gulp.src(config.app.scripts)		
		.pipe(gulpif(activeConfig.sourcemaps, sourcemaps.init()))
		.pipe(babel({					// compiles ecma6 code to a version compatable with browsers and the angularFileSort plugin
			presets: [config.build.babelPreset]
		}))		
};

// combine the angular template html files into one javascript blob
function templates() {
	return gulp.src(config.app.templates)
		.pipe(angularTemplateCache({standalone: true}))
};

/*============================================
OUTPUT STREAMS
============================================*/
function generateIndex() {
	console.log("Generating index: " + config.index);
	return modifyIndex(config.index, { all: true });
}

function updateIndex(sections) {
	console.log("Updating index");
	return modifyIndex(config.build.output + "/index.html", sections);
}

function modifyIndex(index, sections) {
	return gulp.src(index)		
		.pipe(gulpif(sections.all || sections.vendorStyles, inject(vendorStylesOutput(), {name: "vendor", ignorePath: config.build.output})))
		.pipe(gulpif(sections.all || sections.vendorScripts, inject(vendorScriptsOutput(), {name: "vendor", ignorePath: config.build.output})))
		.pipe(gulpif(sections.all || sections.srcStyles, inject(appStylesOutput(), {name: "src", ignorePath: config.build.output})))				
		.pipe(gulpif(sections.all || sections.srcScripts, inject(srcScriptsOutput(), {name: "src", ignorePath: config.build.output})))
		.pipe(gulp.dest(config.build.output));
}

function allStylesOutput() {
	return eventStream.merge(
		vendorStylesOutput(),
		appStylesOutput()
	);
}

function srcScriptsOutput() {
	return eventStream.merge(
			appScripts(),
			templates()
		)				
		.pipe(angularFileSort())		// puts files in correct order to satisfy angular dependency injection		
		.pipe(gulpif(activeConfig.bundle, concat("app.js")))				
		.pipe(gulpif(activeConfig.hash, hash({"format": config.build.hashFormat})))	
		.pipe(gulpif(activeConfig.bundle, rename(path => path.basename += ".bundle")))	
		.pipe(gulpif(activeConfig.minifyScripts, uglify()))
		.pipe(gulpif(activeConfig.minifyScripts, rename(path => path.basename += ".min")))
		.pipe(gulpif(activeConfig.sourcemaps, sourcemaps.write('.')))	// write sourcemaps for processed files
		
		.pipe(gulp.dest(activeConfig.output.app));
}

function appStylesOutput() {
	var cssFilter = filter("**/*.css", {restore: true});

	return gulp.src(config.app.styles)						
		.pipe(cssUseref({base: "assets"}))	// copies referenced files (fonts/images) within the css file		
		
		// filter to apply transformations only to .css files
		.pipe(cssFilter)
		.pipe(gulpif(activeConfig.bundle, concat("app.css")))		
		.pipe(gulpif(activeConfig.hash, hash({"format": config.build.hashFormat})))	
		.pipe(gulpif(activeConfig.bundle, rename(path => path.basename += ".bundle")))	
		.pipe(gulpif(activeConfig.minifyCss, cleanCSS()))
		.pipe(gulpif(activeConfig.minifyCss, rename(path => path.basename += ".min")))
		.pipe(cssFilter.restore)

		.pipe(gulp.dest(activeConfig.output.app));
};

function vendorScriptsOutput() {
	return gulp.src(activeConfig.vendor.scripts)				
		.pipe(gulpif(activeConfig.bundle, concat("vendor.js")))
		.pipe(gulpif(activeConfig.hash, hash({"format": config.build.hashFormat})))	
		.pipe(gulpif(activeConfig.bundle, rename(path => path.basename += ".bundle")))	
		.pipe(gulpif(activeConfig.minifyScripts, uglify()))
		.pipe(gulpif(activeConfig.minifyScripts, rename(path => path.basename += ".min")))
		.pipe(gulp.dest(activeConfig.output.vendor));
}

function vendorStylesOutput() {
	var cssFilter = filter("**/*.css", {restore: true});

	return gulp.src(activeConfig.vendor.styles)		
		.pipe(cssUseref({base: "assets"}))	// copies referenced files (fonts/images) within the css file		

		// filter to apply transformations only to .css files
		.pipe(cssFilter)	
		.pipe(gulpif(activeConfig.bundle, concat("vendor.css")))	
		.pipe(gulpif(activeConfig.hash, hash({"format": config.build.hashFormat})))			
		.pipe(gulpif(activeConfig.bundle, rename(path => path.basename += ".bundle")))	
		.pipe(gulpif(activeConfig.minifyCss, cleanCSS()))	
		.pipe(gulpif(activeConfig.minifyCss, rename(path => path.basename += ".min")))	
		.pipe(cssFilter.restore)	

		.pipe(gulp.dest(activeConfig.output.vendor));
};

/*============================================
TASKS
============================================*/
gulp.task(clean);

gulp.task(validateJs);

gulp.task("build-dev", gulp.series(clean, setDev, validateJs, generateIndex));

gulp.task("build-prod", gulp.series(clean, setProd, generateIndex));

gulp.task("watch-dev", function() {
	gulp.watch(config.index, gulp.series(setDev, generateIndex));
	// Vendor
	gulp.watch(config.dev.vendor.styles, gulp.series(setDev, () => updateIndex({vendorStyles: true})));
	gulp.watch(config.dev.vendor.scripts, gulp.series(setDev, () => updateIndex({vendorScripts: true})));
	// Src
	gulp.watch(config.app.styles, gulp.series(setDev, () => updateIndex({srcStyles: true})));
	gulp.watch(config.app.scripts, gulp.series(setDev, validateJs, () => updateIndex({srcScripts: true})));
	gulp.watch(config.app.templates, gulp.series(setDev, () => updateIndex({srcScripts: true})));	
});

gulp.task("default", gulp.series("build-dev", "watch-dev"));