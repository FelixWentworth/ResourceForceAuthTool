var gulp = require("gulp");
var jshint = require("gulp-jshint");
var concat = require("gulp-concat");
var inject = require("gulp-inject");
var eventStream = require("event-stream");
var del = require("del");
var sequence = require("run-sequence");
var angularTemplateCache = require("gulp-angular-templatecache");
var angularFileSort = require("gulp-angular-filesort");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var cssUseref = require("gulp-css-useref");
var server = require("gulp-server-livereload");

/*============================================
PROJECT CONFIGURATION   
============================================*/
var config = {
	src: {
		root: "app",
		scripts: "app/**/*.js",
		styles: "app/**/*.css",
		templates: "app/**/*.html",
		index: "index.html",
		images: "app/**/*.png"
	},
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
	// Development build configuration
	build: {
		root: "build",
		babelPreset: "es2015",
		dev: {			
			srcRoot: "build/app",
			vendor: "build/vendor",
		}
	}
};

// Active build configuration (development or production)
var buildConfig = null;

/*============================================
TASKS
============================================*/
gulp.task("default", function() {
	return sequence("build-dev", "watch", "server");
});

gulp.task("build-dev", function(){
	return sequence("clean", "set-dev", "jshint", "src-scripts", "src-styles", 
		"vendor-scripts", "vendor-styles", "index", "src-images");
});

gulp.task("build-prod", function(){
	return sequence("clean", "set-prod", "src-scripts", "src-styles", 
		"vendor-scripts", "vendor-styles", "index", "src-images");
});

gulp.task("server", function() {
	return gulp.src(config.build.root)
		.pipe(server({
			livereload: true,
			open: true,
			port: 8080
		}));
});

gulp.task("watch", function() {
	gulp.watch(config.src.index, ["set-dev", "index"]);
	gulp.watch(config.src.scripts, ["set-dev", "jshint", "src-scripts", "index"]);
	gulp.watch(config.src.styles, ["set-dev", "src-styles", "index"]);
	gulp.watch(config.src.templates, ["set-dev", "src-templates", "index"]);
	gulp.watch(config.src.images, ["set-dev", "src-images"]);
	gulp.watch(config.vendor.scripts, ["set-dev", "vendor-scripts", "index"]);
	gulp.watch(config.vendor.styles, ["set-dev", "vendor-styles", "index"]);
});

// set build configuration to development
gulp.task("set-dev", function() {
	buildConfig = config.build.dev;
});

gulp.task("set-prod", function() {
	buildConfig = config.prod;
});

gulp.task("clean", function() {
	return del([config.build.root + "/*"]);
});

// Generate the index adding all .js and .css references.
gulp.task("index", function() {
	return gulp.src(config.src.index)
		// scripts
		.pipe(
			// combine all .js streams and inject into index
			inject(
				eventStream.merge(
					vendorScriptStream(),
					srcScriptStream(),
					srcTemplateStream()			
				),
				{ignorePath: config.build.root }
			)		
		)
		// styles
		.pipe(
			// combine all css streams and inject into index
			inject(				
				eventStream.merge(
					vendorStyleStream(),
					srcStyleStream()
				),
				{ignorePath: config.build.root }
			)
		)		
		.pipe(gulp.dest(config.build.root));
});

gulp.task("src-scripts", function() {
	return srcScriptStream();
});

gulp.task("src-styles", function() {
	return srcStyleStream();
});

gulp.task("src-templates", function() {
	return srcTemplateStream();
});

gulp.task("src-images", function() {
	return gulp.src(config.src.images)
		.pipe(gulp.dest(buildConfig.srcRoot));
});

gulp.task("vendor-scripts", function() {
	return vendorScriptStream();
});

gulp.task("vendor-styles", function() {
	return vendorStyleStream();
});

gulp.task("jshint", function() {
	return gulp.src(config.src.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter("jshint-stylish"));
});

/*============================================
STREAMS
============================================*/
function srcScriptStream() {
	return gulp.src(config.src.scripts)
		//.pipe(concat("all.js"))
		.pipe(sourcemaps.init())
		.pipe(babel({					// compiles ecma6 code to a version compatable with browsers and the angularFileSort plugin
			presets: [config.build.babelPreset]
		}))		
		.pipe(angularFileSort())		// puts files in correct order to satisfy angular dependency injection
		.pipe(sourcemaps.write('.'))	// write sourcemaps for processed files
		.pipe(gulp.dest(buildConfig.srcRoot));
};

function srcStyleStream() {
	return gulp.src(config.src.styles)
		//.pipe(concat("all.css"))
		.pipe(cssUseref({base: "assets"}))	// copies referenced files (fonts/images) within the css file
		.pipe(gulp.dest(buildConfig.srcRoot));
};

function vendorScriptStream() {
	return gulp.src(config.vendor.scripts)
		.pipe(gulp.dest(buildConfig.vendor));
}

function vendorStyleStream() {
	return gulp.src(config.vendor.styles)
		.pipe(cssUseref({base: "assets"}))	// copies referenced files (fonts/images) within the css file
		.pipe(gulp.dest(buildConfig.vendor));
};

// combine the angular template html files into one javascript blob
function srcTemplateStream() {
	return gulp.src(config.src.templates)
		.pipe(angularTemplateCache({standalone: true}))
		.pipe(gulp.dest(config.build.root));
};