var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),

	jshint = plugins['jshint'],
	protractor = plugins['protractor'].protractor,
//	webdriver_standalone = plugins.protractor.webdriver_standalone,
//	webdriver_update = plugins.protractor.webdriver_update,

	concat = plugins['concat'],
	uglify = plugins['uglify'],
	rename = plugins['rename'],
	header = plugins['header'],
	sourcemaps = plugins['sourcemaps'],
	minifyCss = plugins['minify-css'],

	pkg = require('./package.json'),
	map = require('map-stream'),
	extend = require('node.extend'),
	jshint_stylish = require('jshint-stylish'),

	banner = '/*! <%=pkg.name%> - v<%=pkg.version%> - <%=pkg.description%> - <%=pkg.license%> - <%= pkg.homepage %> */',

	files = {
		main: {
			src: ['app/js/*.js', '!app/js/bwmon.min.js', '!app/bwmonUsage.js'],
			libs: [
				'bower_components/angular/angular.min.js',
				'bower_components/angular-route/angular-route.min.js',
				'bower_components/underscore/underscore-min.js',
				'bower_components/momentjs/min/moment.min.js',
				'bower_components/d3/d3.min.js',
				'bower_components/n3-line-chart/build/line-chart.min.js'
			]
		},
		unit: {
			src: ['test/unit/**/*.js'],
			libs: ['bower_components/angular-mocks/angular-mocks.js']
		},
		e2e : {
			src: ['test/e2e/**/*.js']
		},
		data: ['app/bwmonUsage.js'],
		build: {
			dest: 'dist/js',
			temp: 'bwmon.js',
			name: 'bwmon.min.js',
			libs: 'libs.min.js'
		}
	},
	exitOnJshintError = map(function (file, cb) {
		if (!file.jshint.success) {
			console.error('jshint failed');
			process.exit(1);
		}
	}),
	objectExists = function(object) {
		return typeof object != "undefined";
	},
	karma = function(done, config) {
		var Server = require('karma').Server,
			defaults = {
				files: [].concat(files.main.libs, files.unit.libs, files.main.src, files.unit.src, files.data),
				configFile: __dirname+'/config/karma.conf.js',
			},
			parameters = extend(defaults, config);
		console.log(parameters);
		new Server(parameters, done).start();
	};

gulp.task('jshint', function() {
	var src = [].concat(files.main.src, files.unit.src, files.e2e.src, files.data);
	console.log(src);
	return gulp
		.src(src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshint_stylish))
		.pipe(exitOnJshintError);
});

gulp.task('unit', function(done) { karma(done); });
gulp.task('unit_auto', function(done) { karma(done, {autoWatch: true, singleRun: false}); });
gulp.task('coverage', function(done) { karma(done, {reporters: ['coverage']}); });

// broken in windows
// gulp.task('webdriver_update', webdriver_update);
// gulp.task('webdriver_standalone', webdriver_standalone);
gulp.task('e2e', function() {
	var src = files.e2e.src;
	console.log(src);
	return gulp
		.src(src)
		.pipe(protractor({configFile: __dirname+'/config/protractor.conf.js'}))
});

gulp.task('buildlibs', function() {
	var src = [].concat(files.main.libs);
	console.log(src);
	return gulp
		.src(src)
		.pipe(concat(files.build.libs))
		.pipe(gulp.dest(files.build.dest))
});

gulp.task('build', function() {
	var src = [].concat(files.main.libs, files.main.src);
	console.log(src);
	return gulp
		.src(src)
		.pipe(sourcemaps.init())
		.pipe(concat(files.build.temp, {newLine: ';'}))
		.pipe(gulp.dest(files.build.dest))
		.pipe(rename(files.build.name))
		.pipe(uglify())
		.pipe(header(banner, {pkg: pkg}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(files.build.dest));
});


gulp.task('watch', function() {
	var src = [].concat(files.main.src, files.unit.src, files.e2e.src, files.data);
	console.log(src);
	gulp.watch(src, ['jshint', 'unit']);
});

gulp.task('default', ['jshint', 'unit', 'e2e']);
