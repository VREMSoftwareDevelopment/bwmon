var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),

	jshint = plugins['jshint'],
	protractor = plugins['protractor'].protractor,
// FIXME
//	webdriver_standalone = plugins.protractor.webdriver_standalone,
//	webdriver_update = plugins.protractor.webdriver_update,

	concat = plugins['concat'],
	uglify = plugins['uglify'],
	rename = plugins['rename'],
	header = plugins['header'],
	sourcemaps = plugins['sourcemaps'],
	minifyCss = plugins['minifyCss'],

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
		buildjs: {
			dest: 'dist/js',
			temp: 'bwmon.js',
			name: 'bwmon.min.js'
		},
		buildcss: {
			src: [
				'app/css/app.css',
				'bower_components/bootstrap/dist/css/bootstrap.min.css'
			],
			dest: 'dist/css',
			name: 'bwmon.min.css'
		}
	},
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
		.pipe(jshint.reporter('fail'));
});

gulp.task('unit', ['jshint'], function(done) { karma(done); });
gulp.task('unit_auto', function(done) { karma(done, {autoWatch: true, singleRun: false}); });
gulp.task('coverage', function(done) { karma(done, {reporters: ['coverage']}); });

gulp.task('buildcss', function() {
	console.log(files.buildcss.src);
	return gulp
		.src(files.buildcss.src)
		.pipe(minifyCss())
		.pipe(concat(files.buildcss.name))
		.pipe(gulp.dest(files.buildcss.dest));
});

gulp.task('buildjs', ['unit'], function() {
	var src = [].concat(files.main.libs, files.main.src);
	console.log(src);
	return gulp
		.src(src)
		.pipe(sourcemaps.init())
		.pipe(concat(files.buildjs.temp, {newLine: ';'}))
		.pipe(gulp.dest(files.buildjs.dest))
		.pipe(rename(files.buildjs.name))
		.pipe(uglify())
		.pipe(header(banner, {pkg: pkg}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(files.buildjs.dest));
});

// FIXME
// gulp.task('webdriver_update', webdriver_update);
// gulp.task('webdriver_standalone', webdriver_standalone);
gulp.task('e2e', ['buildjs', 'buildcss'], function() {
	var src = files.e2e.src;
	console.log(src);
	return gulp
		.src(src)
		.pipe(protractor({configFile: __dirname+'/config/protractor.conf.js'}))
});


gulp.task('watch', function() {
	var src = [].concat(files.main.src, files.unit.src, files.e2e.src, files.data);
	console.log(src);
	gulp.watch(src, ['jshint', 'unit']);
});

gulp.task('default', ['e2e']);
