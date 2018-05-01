const gulp = require("gulp");
const jshint = require("gulp-jshint");
const concat = require("gulp-concat");
const inject = require("gulp-inject");
const eventStream = require("event-stream");
const del = require("del");
const angularTemplateCache = require("gulp-angular-templatecache");
const angularFileSort = require("gulp-angular-filesort");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const cssUseref = require("gulp-css-useref");
const gulpif = require("gulp-if");
const filter = require("gulp-filter");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const rev = require("gulp-rev");
const loadJsonFile = require("load-json-file");


/*============================================
BUILD CONSTANTS
============================================*/
const indexFile = "index.html";
const babelPreset = "env";
const esversion = 6;
		

/*============================================
LOAD CONFIGS
============================================*/
const configs = loadJsonFile.sync("gulpfile.configs.json");


/*============================================
ACTIVE CONFIG
============================================*/
let activeConfig = null;

function setActiveConfig(configName, done) {
	console.log(`Activating the "${configName}" configuration.`);

	activeConfig = configs[configName];
	done();
}


/*============================================
STREAMS
============================================*/
function clean() {
	return del(activeConfig.output.root + "/*", { force: true });
}

function validateJs() {
	return gulp.src(activeConfig.app.scripts)
		.pipe(jshint({ esversion: esversion }))
		.pipe(jshint.reporter("jshint-stylish"));
}

function appScripts() {
	console.log("App Scripts");

	const paths = [activeConfig.app.scripts];
	activeConfig.ignoreSuffixes.forEach(ignoreSuffix => {
		const ignorePath = "!" + activeConfig.app.root + "/**" + ignoreSuffix + "**";
		paths.push(ignorePath);
	});

	return gulp.src(paths)
		.pipe(gulpif(activeConfig.sourcemaps, sourcemaps.init()))
		.pipe(babel({ // compiles ecma6 code to a version compatable with browsers and the angularFileSort plugin
			presets: [babelPreset]
		}));
}

// combine the angular template html files into one javascript blob
function templates() {
	console.log("Templates");

	const paths = [activeConfig.app.templates];
	activeConfig.ignoreSuffixes.forEach(ignoreSuffix => {
		const ignorePath = "!" + activeConfig.app.root + "/**" + ignoreSuffix + "**";
		paths.push(ignorePath);
	});

	return gulp.src(paths)
		.pipe(angularTemplateCache({ standalone: true }));
}


/*============================================
OUTPUT STREAMS
============================================*/
function generateIndex() {
	console.log("Generating index");
	return modifyIndex(indexFile, { all: true });
}

function updateIndex(sections) {
	console.log("Updating index: ");
	return modifyIndex(`${activeConfig.output.root}/${indexFile}`, sections);
}

function modifyIndex(indexPath, sections) {
	return gulp.src(indexPath)
		.pipe(gulpif(sections.all || sections.vendorStyles, inject(vendorStylesOutput(), { name: "vendor", ignorePath: activeConfig.output.root})))
		.pipe(gulpif(sections.all || sections.vendorScripts, inject(vendorScriptsOutput(), { name: "vendor", ignorePath: activeConfig.output.root })))
		.pipe(gulpif(sections.all || sections.srcStyles, inject(appStylesOutput(), { name: "src", ignorePath: activeConfig.output.root})))
		.pipe(gulpif(sections.all || sections.srcScripts, inject(srcScriptsOutput(), { name: "src", ignorePath: activeConfig.output.root })))
		.pipe(gulp.dest(activeConfig.output.root));
}

function srcScriptsOutput() {
	return eventStream.merge(
		appScripts(),
		templates()
	)
		.pipe(angularFileSort())		// puts files in correct order to satisfy angular dependency injection		
		.pipe(gulpif(activeConfig.bundle, concat("app.js")))
		.pipe(gulpif(activeConfig.hash, rev()))
		.pipe(gulpif(activeConfig.bundle, rename(path => path.basename += ".bundle")))
		.pipe(gulpif(activeConfig.minifyScripts, uglify()))
		.pipe(gulpif(activeConfig.minifyScripts, rename(path => path.basename += ".min")))
		.pipe(gulpif(activeConfig.sourcemaps, sourcemaps.write('.')))	// write sourcemaps for processed files

		.pipe(gulp.dest(activeConfig.output.app));
}

function appStylesOutput() {
	console.log("App Styles");

	const cssFilter = filter("**/*.css", { restore: true });

	return gulp.src([activeConfig.app.styles,
	"!" + activeConfig.app.root + "/**" + activeConfig.ignoreSuffix + "**"])
		.pipe(cssUseref({ base: "assets" }))	// copies referenced files (fonts/images) within the css file		

		// filter to apply transformations only to .css files
		.pipe(cssFilter)
		.pipe(gulpif(activeConfig.bundle, concat("app.css")))
		.pipe(gulpif(activeConfig.hash, rev()))
		.pipe(gulpif(activeConfig.bundle, rename(path => path.basename += ".bundle")))
		.pipe(gulpif(activeConfig.minifyCss, cleanCSS()))
		.pipe(gulpif(activeConfig.minifyCss, rename(path => path.basename += ".min")))
		.pipe(cssFilter.restore)

		.pipe(gulp.dest(activeConfig.output.app));
}

function vendorScriptsOutput() {
	console.log("Vendor Scripts");

	return gulp.src(activeConfig.vendor.scripts)
		.pipe(gulpif(activeConfig.bundle, concat("vendor.js")))
		.pipe(gulpif(activeConfig.hash, rev()))
		.pipe(gulpif(activeConfig.bundle, rename(path => path.basename += ".bundle")))
		.pipe(gulpif(activeConfig.minifyScripts, uglify()))
		.pipe(gulpif(activeConfig.minifyScripts, rename(path => path.basename += ".min")))
		.pipe(gulp.dest(activeConfig.output.vendor));
}

function vendorStylesOutput() {
	console.log("Vendor Styles");

	const cssFilter = filter("**/*.css", { restore: true });

	return gulp.src(activeConfig.vendor.styles)
		.pipe(cssUseref({ base: "assets" }))	// copies referenced files (fonts/images) within the css file		

		// filter to apply transformations only to .css files
		.pipe(cssFilter)
		.pipe(gulpif(activeConfig.bundle, concat("vendor.css")))
		.pipe(gulpif(activeConfig.hash, rev()))
		.pipe(gulpif(activeConfig.bundle, rename(path => path.basename += ".bundle")))		
		.pipe(gulpif(activeConfig.minifyCss, cleanCSS()))
		.pipe(gulpif(activeConfig.minifyCss, rename(path => path.basename += ".min")))
		.pipe(cssFilter.restore)

		.pipe(gulp.dest(activeConfig.output.vendor));
}

function extrasOutput(done) {
	if(activeConfig.extras.length) {
		return gulp.src(activeConfig.extras)
			.pipe(gulp.dest(activeConfig.output.root));
	} else {
		done();
	}
}


/*============================================
TASKS
============================================*/
for(let configName in configs) {
	let setThisConfigActive = done => setActiveConfig(configName, done);
	let thisConfig = configs[configName];
	
	gulp.task(`${configName}-clean`, gulp.series(setThisConfigActive, clean));
	
	let buildTaskName = `${configName}-build`;
	gulp.task(buildTaskName, gulp.series(setThisConfigActive, clean, validateJs, generateIndex, extrasOutput));

	let watchTaskName = `${configName}-watch`;
	gulp.task(watchTaskName, function () {
		gulp.watch(indexFile, gulp.series(setThisConfigActive, generateIndex));
		// Vendor
		gulp.watch(thisConfig.vendor.styles, gulp.series(setThisConfigActive, () => updateIndex({ vendorStyles: true })));
		gulp.watch(thisConfig.vendor.scripts, gulp.series(setThisConfigActive, () => updateIndex({ vendorScripts: true })));
		// Src
		gulp.watch(thisConfig.app.styles, gulp.series(setThisConfigActive, () => updateIndex({ srcStyles: true })));
		gulp.watch(thisConfig.app.images, gulp.series(setThisConfigActive, () => updateIndex({ srcStyles: true })));
		gulp.watch(thisConfig.app.scripts, gulp.series(setThisConfigActive, validateJs, () => updateIndex({ srcScripts: true })));
		gulp.watch(thisConfig.app.templates, gulp.series(setThisConfigActive, () => updateIndex({ srcScripts: true })));
		gulp.watch(thisConfig.extras, gulp.series(setThisConfigActive, extrasOutput));
	});

	gulp.task(`${configName}-build-watch`, gulp.series(buildTaskName, watchTaskName));
};