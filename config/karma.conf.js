module.exports = function(config){
	'use strict';

	config.set({
		basePath: '../',
		autoWatch: false,
		singleRun: true,
		frameworks: ['jasmine'],
		browsers : [
//			'Chrome',
//			'Firefox',
			'PhantomJS'
		],
		plugins: [
			'karma-jasmine',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-phantomjs-launcher',
			'karma-coverage',
			'karma-junit-reporter'
		],
		reporters: [
			'junit',
//			'coverage',
			'progress'
		],
		junitReporter: {
			outputDir: 'logs',
			outputFile: 'logs/test-results.xml',
			suite: 'unit'
		},
		preprocessors: {
			'app/js/**/*.js': 'coverage'
		},
		coverageReporter: {
			type: 'html',
			dir: 'logs/'
		}
	});
};
