/*
 *    Copyright (C) 2010 - 2018 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	pkg = require('./package.json'),
	extend = require('node.extend'),
	jshint_stylish = require('jshint-stylish'),
	del = require('del'),
	log = require('fancy-log'),
	argv = require('yargs').argv,
	banner = 'window.VERSION="<%=pkg.version%>";\n/*\n\t<%=pkg.name%> v<%=pkg.version%>\n\t(C) 2010 - 2018 VREM Software Development\n\t<%= pkg.homepage %>\n\tLicense: <%=pkg.license%>\n*/\n',
	srcdir = 'app',
	dstdir = 'dist',
	cmpdir = 'node_modules',
	dataname = pkg.name+'Usage.js',

	showColor = argv.color === undefined || argv.color === null ? true : argv.color,

	files = {
		other: {
			src: [srcdir+'/'+dataname, srcdir+'/favicon.ico'],
			dest: dstdir
		},
		js: {
			src: [srcdir+'/**/*.js'],
			libs: [
				cmpdir+'/angular/angular.min.js',
				cmpdir+'/angular-route/angular-route.min.js',
				cmpdir+'/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
				cmpdir+'/angular-utils-pagination/dirPagination.js',
				cmpdir+'/underscore/underscore-min.js',
				cmpdir+'/moment/min/moment.min.js',
				cmpdir+'/d3/d3.min.js',
				cmpdir+'/n3-charts/build/LineChart.min.js'
			],
			dest: dstdir+'/js',
			temp: pkg.name+'.js',
			name: pkg.name+'.min.js',
			excludes: ['!'+srcdir+'/**/'+dataname, '!'+srcdir+'/**/*.Test.js'],
			libsname: 'libs.min.js'
		},
		test: {
			libs: [cmpdir+'/angular-mocks/angular-mocks.js']
		},
		e2e : {
			src: 'e2e/**/*.Test.js'
		},
		css: {
			src: [srcdir+'/css/*.css'],
			libs: [
				cmpdir+'/bootstrap/dist/css/bootstrap.min.css',
				cmpdir+'/n3-charts/build/LineChart.min.css',
			],
			dest: dstdir+'/css',
			name: pkg.name+'.min.css'
		},
		img: {
			src: srcdir+'/css/*.png',
			dest: dstdir+'/css'
		},
		templates:  {
			src: srcdir+'/**/**.tpl.html',
			module: 'BWMonApp',
			dest: srcdir,
			name: '/templates.js'
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
			src: ['./package.json'],
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
				basePath: __dirname,
				files: [].concat(files.js.libs, files.test.libs, files.js.src, files.templates.src),
				configFile: __dirname+'/config/karma.conf.js',
				colors: showColor
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
	log(dstdir);
	return del.sync(dstdir);
});

gulp.task('templates:clean', function() {
	var src = files.templates.dstdir+files.templates.name;
	log("   ["+src+"]");
	return del.sync(src);
});

gulp.task('html:clean', function() {
	var src = files.html.prod.dest+'/'+files.html.name;
	log("   ["+src+"]");
	return del.sync(src);
});

gulp.task('devhtml:clean', function() {
	var src = files.html.dev.dest+'/'+files.html.name;
	log("   ["+src+"]");
	return del.sync(src);
});

gulp.task('devhtml', ['devhtml:clean'], function() {
	var src = files.html.src;
	log("   ["+src+"]");
	return gulp
		.src(src)
		.pipe(plugins.rename(files.html.name))
		.pipe(plugins.preprocess(files.html.dev.preprocess))
		.pipe(gulp.dest(files.html.dev.dest));
});

gulp.task('pagination', function() {
	var src = cmpdir+'/angularUtils-pagination/dirPagination.js';
	log("   ["+src+"]");
	return gulp
		.src(src)
		.pipe(plugins.rename('dirPagination.min.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(cmpdir+'/angularUtils-pagination'));
});

gulp.task('jshint', ['pagination'], function() {
	var src = [].concat(files.js.src, files.e2e.src, '!'+srcdir+'/**'+files.templates.name, '!'+srcdir+'/**/'+dataname);
	log("   ["+src+"]");
	return gulp
		.src(src)
		.pipe(plugins.iife())
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter(jshint_stylish))
		.pipe(plugins.jshint.reporter('fail'));
});

gulp.task('test', ['jshint', 'devhtml'], function(done) { karma(done); });
gulp.task('testauto', ['jshint', 'devhtml'], function(done) { karma(done, {autoWatch: true, singleRun: false}); });
gulp.task('coverage', ['jshint', 'devhtml'], function(done) { karma(done, {reporters: ['coverage']}); });

gulp.task('cssmin', function() {
	var src = files.css.src;
	log("   ["+src+"]");
	return gulp
		.src(src)
		.pipe(plugins.cleanCss())
		.pipe(plugins.concat(files.css.name))
		.pipe(gulp.dest(files.css.dest));
});

gulp.task('img', function() {
	var src = files.img.src;
	log("   ["+src+"]");
	return gulp
		.src(src)
		.pipe(gulp.dest(files.img.dest));
});

gulp.task('csslibs', function() {
	var src = files.css.libs;
	log("   ["+src+"]");
	return gulp
		.src(src)
		.pipe(gulp.dest(files.css.dest));
});

gulp.task('jslibs', function() {
	var src = files.js.libs;
	log("   ["+src+"]");
	return gulp
		.src(src)
		.pipe(plugins.concat(files.js.libsname, {newLine: ';'}))
		.pipe(gulp.dest(files.js.dest));
});

gulp.task('templates', ['templates:clean'], function() {
	var src = files.templates.src;
	log("   ["+src+"]");
	return gulp
		.src(src)
		.pipe(plugins.htmlmin())
		.pipe(plugins.angularTemplatecache({module: files.templates.module}))
		.pipe(gulp.dest(files.templates.dest));
});

gulp.task('uglify', ['uglify:clean', 'templates', 'test'], function() {
	var src = [].concat(files.js.src, files.js.excludes);
	log("   ["+src+"]");
	return gulp
		.src(src)
		.pipe(plugins.concat(files.js.temp, {newLine: ';'}))
		.pipe(gulp.dest(files.js.dest))
		.pipe(plugins.rename(files.js.name))
		.pipe(plugins.sourcemaps.init())
			.pipe(plugins.ngAnnotate())
			.pipe(plugins.iife())
			.pipe(plugins.uglify({mangle: false, compress: true}))
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest(files.js.dest));
});

gulp.task('header', ['uglify'], function() {
	var src = files.js.dest + "/" + files.js.name;
	log("   ["+src+"]");
	return gulp
		.src(src)
		.pipe(plugins.header(banner, {pkg: pkg}))
		.pipe(gulp.dest(files.js.dest));
});

gulp.task('html', ['html:clean'], function() {
	var src = files.html.src;
	log("   ["+src+"]");
	return gulp
		.src(src)
		.pipe(plugins.rename(files.html.name))
		.pipe(plugins.preprocess(files.html.prod.preprocess))
		.pipe(gulp.dest(files.html.prod.dest));
});

gulp.task('other', function() {
	var src = files.other.src;
	log("   ["+src+"]");
	return gulp
		.src(src)
		.pipe(gulp.dest(files.other.dest));
});

gulp.task('webserver', ['jslibs', 'header', 'csslibs', 'cssmin', 'html', 'img', 'other'], function() {
	plugins.connect.server({
		root: dstdir,
		port: 8080
	});
});

gulp.task('webdriverUpdate', plugins.protractor.webdriver_update);

gulp.task('e2e', ['webdriverUpdate', 'webserver'], function() {
	var src = '../'+files.e2e.src;
	log("   ["+src+"]");
	return gulp
		.src(src)
		.pipe(plugins.protractor.protractor({configFile: 'config/protractor.conf.js'}));
});

gulp.task('build', ['e2e'], function() {
	var src = files.js.dest+'/'+files.js.temp;
	log("   ["+src+"]");
	plugins.connect.serverClose();
	return del(src);
});

gulp.task('watch', function() {
	var src = [].concat(files.main.src, files.test.src, files.e2e.src);
	log("   ["+src+"]");
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
 * 		version:<>, git:tag, release
 */
gulp.task('version:patch', function() { return version('patch'); });
gulp.task('version:minor', function() { return version('minor'); });
gulp.task('version:major', function() { return version('major'); });

gulp.task('git:tag', function() {
	var src = files.version.src;
	log("   ["+src+"]");
	return gulp.src(src)
		.pipe(plugins.git.commit(files.version.message))
		.pipe(plugins.filter(files.version.filter))
		.pipe(plugins.tagVersion());
});

gulp.task('release:clean', function() {
	var src = files.release.dest;
	log("   ["+src+"]");
	return del.sync(src);
});

gulp.task('release', ['release:clean', 'build'], function() {
	var src = files.release.src;
	log("   ["+src+"]");
	return gulp
		.src(src)
		.pipe(plugins.tar(files.release.name))
		.pipe(plugins.gzip({gzipOptions: {level: 9}}))
		.pipe(gulp.dest(files.release.dest));
});

/*
 * Clean
 */
gulp.task('clean', ['uglify:clean', 'templates:clean', 'html:clean', 'devhtml:clean']);

