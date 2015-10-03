var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),

	pkg = require('./package.json'),
	extend = require('node.extend'),
	jshint_stylish = require('jshint-stylish'),
	del = require('del'),
	argv = require('yargs').argv,

	banner = '/*\n\t<%=pkg.name%> v<%=pkg.version%>\n\t(C) 2010 - 2015 VREM Software Development\n\t<%= pkg.homepage %>\n\tLicense: <%=pkg.license%>\n*/\n',
	srcdir = 'app',
	dstdir = 'dist',
	cmpdir = 'bower_components',
	dataname = pkg.name+'Usage.js',

	files = {
		other: {
			src: [srcdir+'/'+dataname, srcdir+'/favicon.ico'],
			dest: dstdir
		},
		js: {
			src: [srcdir+'/**/*.js', cmpdir+'/angularUtils-pagination/dirPagination.js'],
			libs: [
				cmpdir+'/angular/angular.min.js',
				cmpdir+'/angular-route/angular-route.min.js',
				cmpdir+'/underscore/underscore-min.js',
				cmpdir+'/momentjs/min/moment.min.js',
				cmpdir+'/d3/d3.min.js',
				cmpdir+'/n3-line-chart/build/line-chart.min.js'
			],
			dest: dstdir+'/js',
			temp: pkg.name+'.js',
			name: pkg.name+'.min.js',
			excludes: ['!'+srcdir+'/**/'+dataname, '!'+srcdir+'/**/*.Test.js']
		},
		test: {
			libs: [cmpdir+'/angular-mocks/angular-mocks.js'],
			excludes: srcdir+'/**/!('+dataname+').js'
		},
		e2e : {
			src: ['e2e/**/*.Test.js']
		},
		css: {
			src: [srcdir+'/css/*.css'],
			libs: cmpdir+'/bootstrap/dist/css/bootstrap.min.css',
			dest: dstdir+'/css',
			name: pkg.name+'.min.css'
		},
		templates:  {
			src: srcdir+'/**/**.tpl.html',
			module: 'BWMonApp',
			dest: srcdir
		},
		html:  {
			src: srcdir+'/index.tpl.html',
			name: 'index.html',
			prod: {
				preprocess: {context: {PRODUCTION: true}},
				dest: dstdir,
			},
			dev: {
				preprocess: {context: {DEVELOPMENT: true}},
				dest: srcdir,
			}
		},
		version: {
			src: ['./package.json', './bower.json'],
			dest: './',
			message: 'bumps package version',
			filter: 'package.json'
		},
		release: {
			src: [dstdir+'/**/*', '!'+dstdir+'/'+dataname, 'server/'+pkg.name+'*.sh'],
			name: pkg.name+'.tar',
			dest: 'release'
		}
	},
	objectExists = function(object) {
		return typeof object != "undefined";
	},
	karma = function(done, config) {
		var Server = require('karma').Server,
			defaults = {
				files: [].concat(files.js.libs, files.test.libs, files.js.src, files.test.excludes, files.templates.src),
				configFile: __dirname+'/config/karma.conf.js',
				colors: argv.color ? true : false
			},
			parameters = extend(defaults, config);
		new Server(parameters, done).start();
	},
	version = function(type) {
		return gulp.src(files.version.src)
			.pipe(plugins.bump({type: type}))
			.pipe(gulp.dest(files.version.dest));
	};

gulp.task('uglify:clean', function() {
	return del.sync(dstdir);
});

gulp.task('templates:clean', function() {
	return del.sync(files.templates.dstdir+'/templates.js');
});

gulp.task('html:clean', function() {
	return del.sync(files.html.prod.dest+'/'+files.html.name);
});

gulp.task('devhtml:clean', function() {
	return del.sync(files.html.dev.dest+'/'+files.html.name);
});

gulp.task('devhtml', ['devhtml:clean'], function() {
	return gulp
		.src(files.html.src)
		.pipe(plugins.rename(files.html.name))
		.pipe(plugins.preprocess(files.html.dev.preprocess))
		.pipe(gulp.dest(files.html.dev.dest));
});

gulp.task('jshint', function() {
	var src = [].concat(files.js.src, files.e2e.src, files.js.excludes);
	return gulp
		.src(src)
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter(jshint_stylish))
		.pipe(plugins.jshint.reporter('fail'));
});

gulp.task('test', ['jshint', 'devhtml'], function(done) { karma(done); });
gulp.task('test_auto', ['jshint', 'devhtml'], function(done) { karma(done, {autoWatch: true, singleRun: false}); });
gulp.task('coverage', ['jshint', 'devhtml'], function(done) { karma(done, {reporters: ['coverage']}); });

gulp.task('cssmin', function() {
	return gulp
		.src(files.css.src)
		.pipe(plugins.minifyCss())
		.pipe(plugins.concat(files.css.name))
		.pipe(gulp.dest(files.css.dest));
});

gulp.task('csslibs', function() {
	return gulp
		.src(files.css.libs)
		.pipe(gulp.dest(files.css.dest));
});

gulp.task('jslibs', function() {
	return gulp
		.src(files.js.libs)
		.pipe(gulp.dest(files.js.dest));
});

gulp.task('templates', ['templates:clean'], function() {
	return gulp
		.src(files.templates.src)
		.pipe(plugins.htmlmin())
		.pipe(plugins.angularTemplatecache({module: files.templates.module}))
		.pipe(gulp.dest(files.templates.dest));
});

gulp.task('uglify', ['uglify:clean', 'templates', 'test'], function() {
	var src = [].concat(files.js.src, files.js.excludes);
	return gulp
		.src(src)
		.pipe(plugins.concat(files.js.temp, {newLine: ';'}))
		.pipe(gulp.dest(files.js.dest))
		.pipe(plugins.rename(files.js.name))
		.pipe(plugins.uglify({mangle: false}))
		.pipe(plugins.header(banner, {pkg: pkg}))
		.pipe(gulp.dest(files.js.dest));
});

gulp.task('html', ['html:clean'], function() {
	return gulp
		.src(files.html.src)
		.pipe(plugins.rename(files.html.name))
		.pipe(plugins.preprocess(files.html.prod.preprocess))
		.pipe(gulp.dest(files.html.prod.dest));
});

gulp.task('other', function() {
	return gulp
		.src(files.other.src)
		.pipe(gulp.dest(files.other.dest));
});

gulp.task('webserver', ['jslibs', 'uglify', 'csslibs', 'cssmin', 'html', 'other'], function() {
	plugins.connect.server({
		root: dstdir,
		port: 8080
	});
});

gulp.task('webdriverUpdate', plugins.protractor.webdriver_update);

gulp.task('e2e', ['webdriverUpdate', 'webserver'], function() {
	return gulp
		.src(files.e2e.src)
		.pipe(plugins.protractor.protractor({configFile: __dirname+'/config/protractor.conf.js'}));
});

gulp.task('build', ['e2e'], function() {
	plugins.connect.serverClose();
	return del(files.js.dest+'/'+files.js.temp);
});

gulp.task('watch', function() {
	var src = [].concat(files.main.src, files.test.src, files.e2e.src);
	gulp.watch(src, ['jshint']);
});

gulp.task('default', ['build']);

/*
 * Development Web Server for manual testing
 */
gulp.task('devwebserver', ['devhtml'], function() {
	plugins.connect.server({
		root: srcdir+'/..',
		port: 8080,
		livereload: true
	});
});

/*
 * Release Management: Version, Git and Release
 */
gulp.task('version:patch', function() { return version('patch'); });
gulp.task('version:minor', function() { return version('minor'); });
gulp.task('version:major', function() { return version('major'); });

gulp.task('git:tag', function() {
	return gulp.src(files.version.src)
		.pipe(plugins.git.commit(files.version.message))
		.pipe(plugins.filter(files.version.filter))
		.pipe(plugins.tagVersion());
});

gulp.task('release:clean', function() {
	return del.sync(files.release.dest);
});

gulp.task('release', ['release:clean'], function() {
	return gulp
		.src(files.release.src)
		.pipe(plugins.tar(files.release.name))
		.pipe(plugins.gzip({gzipOptions: {level: 9}}))
		.pipe(gulp.dest(files.release.dest));
});

/*
 * Clean
 */
gulp.task('clean', ['uglify:clean', 'templates:clean', 'html:clean', 'devhtml:clean']);
