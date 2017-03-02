var gulp = require("gulp-4.0.build");
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
var browsersync = require("browser-sync").create();
var gulpif = require("gulp-if");
var filter = require("gulp-filter");
var uglify = require("gulp-uglify");
var cleanCSS = require("gulp-clean-css");

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
				"node_modules/angular-uuid/angular-uuid.js"
			],
			styles: [
				"node_modules/angular-material/angular-material.css",
				"node_modules/material-design-icons/iconfont/material-icons.css"
			]
		},
		sourcemaps: true,
		concat: false,
		uglify: false,
		cleancss: false,
		output: {
			app: "build/app",
			vendor: "build/vendor",
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
				"node_modules/angular-uuid/angular-uuid.js"
			],
			styles: [
				"node_modules/angular-material/angular-material.min.css",
				"node_modules/material-design-icons/iconfont/material-icons.css"
			]
		},
		sourcemaps: false,
		concat: true,
		uglify: true,
		cleancss: true,
		output: {
			app: "build",
			vendor: "build",
		}	
	},
	// Development build configuration
	build: {
		output: "build",
		babelPreset: "es2015"
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
 	return del([config.build.output + "/*"]);
}

function generateIndex() {
	return gulp.src(config.index)
		// combine all .js streams and inject into index
		.pipe(inject(allScripts(), {ignorePath: config.build.output}))
		// combine all css streams and inject into index
		.pipe(inject(allStyles(), {ignorePath: config.build.output}))		
		.pipe(gulp.dest(config.build.output));
}

function validateJs() {
	return gulp.src(config.app.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter("jshint-stylish"));
};

function allScripts() {
	return eventStream.merge(
		vendorScripts(),
		appScripts(),
		templates()			
	);
}

function allStyles() {
	return eventStream.merge(
		vendorStyles(),
		appStyles()
	);
}

function appScripts() {
	return gulp.src(config.app.scripts)		
		.pipe(gulpif(activeConfig.sourcemaps, sourcemaps.init()))
		.pipe(babel({					// compiles ecma6 code to a version compatable with browsers and the angularFileSort plugin
			presets: [config.build.babelPreset]
		}))		
		.pipe(angularFileSort())		// puts files in correct order to satisfy angular dependency injection
		.pipe(gulpif(activeConfig.uglify, uglify()))
		.pipe(gulpif(activeConfig.concat, concat("app.all.js")))		
		.pipe(gulpif(activeConfig.sourcemaps, sourcemaps.write('.')))	// write sourcemaps for processed files
		.pipe(gulp.dest(activeConfig.output.app));
};

function appStyles() {
	var cssFilter = filter("**/*.css", {restore: true});

	return gulp.src(config.app.styles)				
		.pipe(cssUseref({base: "assets"}))	// copies referenced files (fonts/images) within the css file		

		// filter to apply transformations only to .css files
		.pipe(cssFilter)	
		.pipe(gulpif(activeConfig.cleancss, cleanCSS()))
		.pipe(gulpif(activeConfig.concat, concat("app.all.css")))				
		.pipe(cssFilter.restore)

		.pipe(gulp.dest(activeConfig.output.app));
};

function vendorScripts() {
	return gulp.src(activeConfig.vendor.scripts)
		.pipe(gulpif(activeConfig.uglify, uglify()))
		.pipe(gulpif(activeConfig.concat, concat("vendor.all.js")))
		.pipe(gulp.dest(activeConfig.output.vendor));
}

function vendorStyles() {
	var cssFilter = filter("**/*.css", {restore: true});

	return gulp.src(activeConfig.vendor.styles)		
		.pipe(cssUseref({base: "assets"}))	// copies referenced files (fonts/images) within the css file		

		// filter to apply transformations only to .css files
		.pipe(gulpif(activeConfig.concat, cssFilter))	
		.pipe(gulpif(activeConfig.cleancss, cleanCSS()))
		.pipe(gulpif(activeConfig.concat, concat("vendor.all.css")))	
		.pipe(gulpif(activeConfig.concat, cssFilter.restore))	

		.pipe(gulp.dest(activeConfig.output.vendor));
};

// combine the angular template html files into one javascript blob
function templates() {
	return gulp.src(config.app.templates)
		.pipe(angularTemplateCache({standalone: true}))
		.pipe(gulpif(activeConfig.uglify, uglify()))
		.pipe(gulp.dest(config.build.output));
};
/*============================================
TASKS
============================================*/
gulp.task(clean);

gulp.task(validateJs);

gulp.task("serve", function(done){
	browsersync.init({
		server: config.build.output
	});	
	done();
});

gulp.task("build-dev", gulp.series(clean, setDev, validateJs, generateIndex));

gulp.task("build-prod", gulp.series(clean, setProd, generateIndex));

gulp.task("run-dev", gulp.series("build-dev", "serve"));

gulp.task("run-prod", gulp.series("build-prod", "serve"));

gulp.task("watch-dev", function() {
	gulp.watch(config.index, gulp.series(setDev, generateIndex, browsersync.reload));
	gulp.watch(config.app.scripts, gulp.series(setDev, validateJs, generateIndex, browsersync.reload));
	gulp.watch(config.app.styles, gulp.series(setDev, generateIndex, browsersync.reload));
	gulp.watch(config.app.templates, gulp.series(setDev, generateIndex, browsersync.reload));
	gulp.watch(config.dev.vendor.scripts, gulp.series(setDev, generateIndex, browsersync.reload));
	gulp.watch(config.dev.vendor.styles, gulp.series(setDev, generateIndex, browsersync.reload));
});

gulp.task("default", gulp.series("build-dev", "serve", "watch-dev"));