var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),

	jshint = plugins.jshint,
	protractor = plugins.protractor.protractor,
//	webdriver_standalone = plugins.protractor.webdriver_standalone,
//	webdriver_update = plugins.protractor.webdriver_update,

//	concat = require('gulp-concat'),
//	uglify = require('gulp-uglify'),
//	rename = require('gulp-rename'),

	jshint_stylish = require('jshint-stylish'),

	KarmaServer = require('karma').Server,

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
	};

gulp.task('jshint', function() {
	var src = [].concat(files.main.src, files.unit.src, files.e2e.src, files.data);
	console.log(src);
	return gulp
		.src(src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshint_stylish))
		.pipe(jshint.reporter('fail'))
});

gulp.task('unit', ['jshint'], function(done) {
	var src = [].concat(files.main.libs, files.unit.libs, files.main.src, files.unit.src, files.data);
	console.log(src);
	new KarmaServer({
		files: src,
		configFile: __dirname+'/config/karma.conf.js',
		autoWatch: false,
		singleRun: true
	}, done).start();
});

gulp.task('unit_auto', ['jshint'], function(done) {
	var src = [].concat(files.main.libs, files.unit.libs, files.main.src, files.unit.src, files.data);
	console.log(src);
	new KarmaServer({
		files: src,
		configFile: __dirname+'/config/karma.conf.js',
		autoWatch: true,
		singleRun: false
	}, done).start();
});

gulp.task('unit_coverage', ['jshint'], function(done) {
	var src = [].concat(files.main.libs, files.unit.libs, files.main.src, files.unit.src, files.data);
	console.log(src);
	new KarmaServer({
		files: src,
		configFile: __dirname+'/config/karma.conf.js',
		autoWatch: false,
		singleRun: true,
		reporters: ['coverage']
	}, done).start();
});

// broken in windows
// gulp.task('webdriver_update', webdriver_update);
// gulp.task('webdriver_standalone', webdriver_standalone);

gulp.task('e2e', ['unit'],function() {
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
	var src = srcmain.concat(srctestunit, srcteste2e);
	console.log(src);
	gulp.watch(src, ['jshint']);
});

gulp.task('default', ['jshint', 'unit', 'watch']);
