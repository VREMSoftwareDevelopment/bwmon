'use strict';

exports.config = {
	seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
	capabilities: {
		'browserName': 'chrome'
	},
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
