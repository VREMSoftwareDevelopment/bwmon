var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),

	pkg = require('./package.json'),
	extend = require('node.extend'),
	jshint_stylish = require('jshint-stylish'),
	del = require('del'),

	banner = '/*\n\t<%=pkg.name%> v<%=pkg.version%>\n\t(C) 2010 - 2015 VREM Software Development\n\t<%= pkg.homepage %>\n\tLicense: <%=pkg.license%>\n*/\n',
	srcdir = 'app',
	dstdir = 'dist',
	cmpdir = 'bower_components',
	dataname = pkg.name+'Usage.js',

	files = {
		data: {
			src: [srcdir+'/'+dataname],
			dest: dstdir
		},
		js: {
			src: [srcdir+'/**/*.js'],
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
			excludes: '!'+srcdir+'/**/'+dataname
		},
		unit: {
			src: ['test/unit/**/*.js'],
			libs: [cmpdir+'/angular-mocks/angular-mocks.js'],
			excludes: srcdir+'/**/!('+dataname+').js'
		},
		e2e : {
			src: ['test/e2e/**/*.js']
		},
		css: {
			src: srcdir+'/css/app.css',
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
			src: srcdir+'/index.html',
			dest: dstdir,
			preprocess: {
				context: {
					PRODUCTION: true
				}
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
				files: [].concat(files.js.libs, files.unit.libs, files.js.src, files.unit.src, files.data.src, files.unit.excludes),
				configFile: __dirname+'/config/karma.conf.js',
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

gulp.task('jshint', function() {
	var src = [].concat(files.js.src, files.unit.src, files.e2e.src, files.data.src);
	return gulp
		.src(src)
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter(jshint_stylish))
		.pipe(plugins.jshint.reporter('fail'));
});

gulp.task('unit', ['jshint'], function(done) { karma(done); });
gulp.task('unit_auto', function(done) { karma(done, {autoWatch: true, singleRun: false}); });
gulp.task('coverage', function(done) { karma(done, {reporters: ['coverage']}); });

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

gulp.task('uglify', ['uglify:clean', 'templates', 'unit'], function() {
	var src = [].concat(files.js.src, files.js.excludes);
	return gulp
		.src(src)
		.pipe(plugins.concat(files.js.temp, {newLine: ';'}))
		.pipe(gulp.dest(files.js.dest))
		.pipe(plugins.rename(files.js.name))
		.pipe(plugins.uglify())
		.pipe(plugins.header(banner, {pkg: pkg}))
		.pipe(gulp.dest(files.js.dest));
});

gulp.task('html', function() {
	return gulp
		.src(files.html.src)
		.pipe(plugins.preprocess(files.html.preprocess))
		.pipe(gulp.dest(files.html.dest));
});

gulp.task('data', function() {
	return gulp
		.src(files.data.src)
		.pipe(gulp.dest(files.data.dest));
});

gulp.task('webserver', ['jslibs', 'uglify', 'csslibs', 'cssmin', 'html', 'data', ], function() {
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

gulp.task('clean', function() {
	del(files.templates.dest+'/'+files.templates.name);
	return del(dstdir);
});

gulp.task('build', ['e2e'], function() {
	plugins.connect.serverClose();
	return del(files.js.dest+'/'+files.js.temp);
});

gulp.task('watch', function() {
	var src = [].concat(files.main.src, files.unit.src, files.e2e.src, files.data.src);
	gulp.watch(src, ['jshint']);
});

gulp.task('default', ['build']);

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
