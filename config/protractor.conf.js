'use strict';

exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	capabilities: {
		'browserName': 'chrome'
//		'browserName': 'firefox'
//		'browserName': 'phantomjs'
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