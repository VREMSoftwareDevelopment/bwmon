module.exports = function(config){
	'use strict';

	config.set({
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
			'karma-junit-reporter',
			'karma-ng-html2js-preprocessor'
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
			'app/**/*.js': 'coverage',
			'app/**/*.tpl.html': 'ng-html2js'
		},
		ngHtml2JsPreprocessor: {
			stripPrefix: 'app/',
			moduleName: 'my.templates'
		},
		coverageReporter: {
			type: 'html',
			dir: 'logs/'
		}
	});
};
