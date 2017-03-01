var gulp = require("gulp"),
	jshint = require("gulp-jshint"),
	concat = require("gulp-concat"),
	inject = require("gulp-inject"),
	eventStream = require("event-stream"),
	del = require("del"),
	runSequence = require("run-sequence"),
	angularTemplateCache = require("gulp-angular-templatecache"),
	angularFileSort = require("gulp-angular-filesort"),
	babel = require("gulp-babel"),
	sourcemaps = require("gulp-sourcemaps"),
	cssUseref = require("gulp-css-useref");

var config = {
	dev: {
		root: "build/dev",
		srcRoot: "build/dev/app",
		vendor: "build/dev/vendor",
	},
	src: {
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
	}
};

var buildConfig = null;

gulp.task("default", ["build", "watch"]);

gulp.task("build", function() {
	runSequence("set-dev", "clean", "jshint", "src-scripts", "src-styles", 
		"vendor-scripts", "vendor-styles", "index", "src-images");
});

gulp.task("set-dev", function() {
	buildConfig = config.dev;
});

// configure which files to watch and what tasks to use on file changes
gulp.task("watch", function() {
	gulp.watch(config.src.index, ["set-dev", "index"]);
	gulp.watch(config.src.scripts, ["set-dev", "jshint", "src-scripts", "index"]);
	gulp.watch(config.src.styles, ["set-dev", "src-styles", "index"]);
	gulp.watch(config.src.templates, ["set-dev", "src-templates", "index"]);
	gulp.watch(config.src.images, ["set-dev", "src-images"]);
	gulp.watch(config.vendor.scripts, ["set-dev", "vendor-scripts", "index"]);
	gulp.watch(config.vendor.styles, ["set-dev", "vendor-styles", "index"]);
	gulp.watch(config.vendor.fonts, ["set-dev", "vendor-fonts"]);
});

gulp.task("clean", ["set-dev"], function() {
	return del([buildConfig.root + "/*"]);
})

gulp.task("index", function() {
	return gulp.src(config.src.index)
		// scripts
		.pipe(
			inject(
				eventStream.merge(
					vendorScriptStream(),
					srcScriptStream(),
					srcTemplateStream()			
				),
				{ignorePath: buildConfig.root }
			)		
		)
		// styles
		.pipe(
			inject(
				eventStream.merge(
					vendorStyleStream(),
					srcStyleStream()
				),
				{ignorePath: buildConfig.root }
			)
		)		
		.pipe(gulp.dest(buildConfig.root));
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

gulp.task("vendor-fonts", function() {
	return gulp.src(config.vendor.fonts)
		.pipe(gulp.dest(buildConfig.vendor));
});

gulp.task("jshint", function() {
	return gulp.src(config.src.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter("jshint-stylish"));
});

// look at gulp-inject
function srcTemplateStream() {
	return gulp.src(config.src.templates)
		.pipe(angularTemplateCache({standalone: true}))
		.pipe(gulp.dest(buildConfig.root));
}

// streams
function srcScriptStream() {
	return gulp.src(config.src.scripts)
		//.pipe(concat("all.js"))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ["es2015"]
		}))		
		.pipe(angularFileSort())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(buildConfig.srcRoot));
}

function srcStyleStream() {
	return gulp.src(config.src.styles)
		//.pipe(concat("all.css"))
		.pipe(cssUseref({base: "assets"}))
		.pipe(gulp.dest(buildConfig.srcRoot));
}

function vendorScriptStream() {
	return gulp.src(config.vendor.scripts)
		.pipe(gulp.dest(buildConfig.vendor));
}

function vendorStyleStream() {
	return gulp.src(config.vendor.styles)
		.pipe(cssUseref({base: "assets"}))
		.pipe(gulp.dest(buildConfig.vendor));
}