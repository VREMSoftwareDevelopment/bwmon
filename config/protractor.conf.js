'use strict';

exports.config = {
// Testing using Chrome Driver Directly
// seleniumAddress: 'http://localhost:4444/wd/hub',
	chromeOnly: true,
	chromeDriver: '../selenium/chromedriver',
	capabilities: {
		'browserName': 'chrome'
	},
	specs: [
		'../test/e2e/*Spec.js'
	],
	jasmineNodeOpts: {
		onComplete: null,
		showColors: true,
		isVerbose: true,
		includeStackTrace: true,
		defaultTimeoutInterval: 10000
	}
};