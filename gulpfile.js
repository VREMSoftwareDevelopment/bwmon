var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),

	jshint = plugins.jshint,
	protractor = plugins.protractor.protractor,
//	webdriver_standalone = plugins.protractor.webdriver_standalone,
//	webdriver_update = plugins.protractor.webdriver_update,

//	concat = require('gulp-concat'),
//	uglify = require('gulp-uglify'),
//	rename = require('gulp-rename'),

	map = require('map-stream'),
	extend = require('node.extend'),
	jshint_stylish = require('jshint-stylish'),

	files = {
		main: {
			src: ['app/js/*.js'],
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
		srcignore: ['!app/js/bwmon.min.js', '!app/bwmonUsage.js']
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

//gulp.task('build', function() {
//	return gulp
//		.src(['app/bower_components/angular/angular.min.js',
//					'app/bower_components/angular-route/angular-route.min.js',
//					'app/bower_components/underscore/underscore-min.js',
//					'app/bower_components/momentjs/min/moment.min.js',
//					'app/bower_components/d3/d3.min.js',
//					'app/bower_components/n3-line-chart/build/line-chart.min.js',
//					'app/js/**/*.js',
//					'!app/js/bwmon.min.js',
//					'!app/bwmonUsage.js'])
//				.pipe(concat('bwmon.js'))
//				.pipe(gulp.dest('dist'))
//				.pipe(rename('bwmon.min.js'))
//				.pipe(uglify())
//				.pipe(gulp.dest('dist'));
//});
//

gulp.task('watch', function() {
	var src = [].concat(files.main.src, files.unit.src, files.e2e.src, files.data);
	console.log(src);
	gulp.watch(src, ['jshint', 'unit']);
});

gulp.task('default', ['jshint', 'unit', 'e2e']);
