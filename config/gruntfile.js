module.exports = function(grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';',
				stripBanners: true
			},
			dist: {
				src: [
					'app/libs/angular/angular.min.js',
					'app/libs/angular-route/angular-route.min.js',
					'app/libs/underscore/underscore-min.js',
					'app/libs/momentjs/min/moment.min.js',
					'app/libs/d3/d3.min.js',
					'app/libs/line-chart/dist/line-chart.min.js',
					'app/js/**/*.js',
					'!app/js/bwmon.min.js',
					'!app/bwmonUsage.js'
				],
				dest: 'dist/js/<%= pkg.name %>.min.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%=pkg.name%> - v<%=pkg.version%> - <%=pkg.description%> - <%=pkg.licenses.type%> - <%=grunt.template.today("yyyy-mm-dd")%> */',
				sourceMap: true
			},
			build: {
				src: 'dist/js/<%= pkg.name %>.min.js',
				dest: 'dist/js/<%= pkg.name %>.min.js'
			}
		},
		cssmin: {
			combine: {
				files: {
					'dist/css/<%= pkg.name %>.min.css': [
						'app/css/app.css',
						'app/css/bootstrap.min.css',
						'app/css/bootstrap-theme.min.css'
					]
				}
			},
			minify: {
				src: 'dist/css/<%= pkg.name %>.min.css',
				dest: 'dist/css/<%= pkg.name %>.min.css'
			}
		},
		jshint: {
			files: [
				'app/**/*.js',
				'test/**/*.js'
			],
			options: {
				ignores: [
					'**/libs/**/*.js'
				],
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},
		preprocess: {
			options: {
				context: {
					PRODUCTION: true
				}
			},
			html: {
				src: 'app/index.html',
				dest: 'dist/index.html'
			}
		},
		ngtemplates:  {
			app: {
				options: {
					module: 'BWMonApp'
				},
				cwd: 'app',
				src: 'templates/**.tpl.html',
			   	dest: 'app/js/templates.js'
			}
		},
		karma: {
			unit: {
				configFile: 'config/karma.conf.js',
				autoWatch: false,
				singleRun: true
			},
			unit_coverage: {
				configFile: 'config/karma.conf.js',
				autoWatch: false,
				singleRun: true,
				reporters: ['coverage']
			},
			unit_auto: {
				configFile: 'config/karma.conf.js',
				autoWatch: true,
				singleRun: false
			}
		},
		protractor: {
			options: {
				keepAlive: true,
				configFile: "config/protractor.conf.js"
			},
			unit: {
			}
		}
	});

	// always
	grunt.registerTask('default', ['preprocess', 'ngtemplates', 'jshint']);

	// single run test
	grunt.registerTask('test', ['default', 'karma:unit', 'protractor:unit']);

	// auto-test and watch tests
	grunt.registerTask('autotest', ['default', 'karma:unit_auto']);

	//coverage testing
	grunt.registerTask('coverage', ['default', 'karma:unit_coverage']);

	// production build
	grunt.registerTask('production', ['test', 'concat', 'uglify', 'cssmin']);
};
