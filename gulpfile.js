var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),

	jshint = plugins.jshint,
	protractor = plugins.protractor.protractor,
	webdriverStandalone = plugins.protractor.webdriver_standalone,
	webdriverUpdate = plugins.protractor.webdriver_update,
	concat = plugins.concat,
	uglify = plugins.uglify,
	rename = plugins.rename,
	header = plugins.header,
	srcmaps = plugins.sourcemaps,
	cssmin = plugins.minifyCss,
	htmlmin = plugins.htmlmin,
	templates = plugins.angularTemplatecache,
	preprocess = plugins.preprocess,

	pkg = require('./package.json'),
	map = require('map-stream'),
	extend = require('node.extend'),
	jshint_stylish = require('jshint-stylish'),

	banner = '/*! <%=pkg.name%> - v<%=pkg.version%> - <%=pkg.description%> - <%=pkg.license%> - <%= pkg.homepage %> */',

	files = {
		main: {
			src: ['app/**/*.js', 'app/**/!(bwmon.min|bwmonUsage).js'],
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
		uglify: {
			dest: 'dist/js',
			temp: 'bwmon.js',
			name: 'bwmon.min.js'
		},
		cssmin: {
			src: [
				'app/css/app.css',
				'bower_components/bootstrap/dist/css/bootstrap.min.css'
			],
			dest: 'dist/css',
			name: 'bwmon.min.css'
		},
		templates:  {
			src: 'app/templates/**.tpl.html',
			module: 'BWMonApp',
			root: 'templates/',
			dest: 'app/js'
		},
		html:  {
			src: 'app/index.html',
			dest: 'dist'
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

gulp.task('templates', function() {
	console.log(files.templates.src);
	return gulp
		.src(files.templates.src)
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(templates({
			module: files.templates.module,
			root: files.templates.root
		}))
		.pipe(gulp.dest(files.templates.dest));
});

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

gulp.task('cssmin', function() {
	console.log(files.cssmin.src);
	return gulp
		.src(files.cssmin.src)
		.pipe(cssmin())
		.pipe(concat(files.cssmin.name))
		.pipe(gulp.dest(files.cssmin.dest));
});

gulp.task('uglify', ['templates', 'unit'], function() {
	var src = [].concat(files.main.libs, files.main.src);
	console.log(src);
	return gulp
		.src(src)
		.pipe(srcmaps.init())
		.pipe(concat(files.uglify.temp, {newLine: ';'}))
		.pipe(gulp.dest(files.uglify.dest))
		.pipe(rename(files.uglify.name))
		.pipe(uglify())
		.pipe(header(banner, {pkg: pkg}))
		.pipe(srcmaps.write())
		.pipe(gulp.dest(files.uglify.dest));
});

gulp.task('html', function() {
	console.log(files.html.src);
	return gulp
		.src(files.html.src)
		.pipe(preprocess())
		.pipe(gulp.dest(files.html.dest));
});

// FIXME
// gulp.task('webdriver_update', webdriver_update);
// gulp.task('webdriver_standalone', webdriver_standalone);
gulp.task('e2e', ['uglify', 'cssmin', 'html'], function() {
	var src = files.e2e.src;
	console.log(src);
	return gulp
		.src(src)
		.pipe(protractor({configFile: __dirname+'/config/protractor.conf.js'}))
});

gulp.task('watch', function() {
	var src = [].concat(files.main.src, files.unit.src, files.e2e.src, files.data);
	console.log(src);
	gulp.watch(src, ['jshint']);
});

gulp.task('default', ['e2e']);
