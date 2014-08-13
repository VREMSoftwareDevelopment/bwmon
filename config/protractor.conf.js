'use strict';

exports.config = {
// Testing using Chrome Driver Directly
	seleniumAddress: 'http://localhost:4444/wd/hub',
// Currently is broken...
//	chromeOnly: true,
	chromeDriver: '../selenium/chromedriver',
	capabilities: {
		'browserName': 'chrome'
	},
	specs: [
		'../test/e2e/*Spec.js'
	],
	onPrepare: function() {
		// Disable animations so e2e tests run more quickly
		var disableNgAnimate = function() {
			angular.module('disableNgAnimate', []).run(function($animate) {
				$animate.enabled(false);
			});
		};

		browser.addMockModule('disableNgAnimate', disableNgAnimate);
		browser.driver.manage().window().maximize();
	},
	jasmineNodeOpts: {
		onComplete: null,
		showColors: true,
		isVerbose: true,
		includeStackTrace: true,
		defaultTimeoutInterval: 10000
	}
};