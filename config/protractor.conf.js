'use strict';

exports.config = {
	specs: ['../e2e/**/*.Test.js'],
	multiCapabilities: [{
		'browserName': 'firefox',
		'moz:firefoxOptions': {
			args: [ '--headless' ]
		}
	}, {
		'browserName': 'chrome',
		chromeOptions: {
			args: ["--headless", "--disable-gpu", "--window-size=800x600"]
		}
	}],
/*	
	capabilities: {
		'browserName': 'firefox',
		'moz:firefoxOptions': {
			args: [ '--headless' ]
		}
	},
	capabilities: {
		'browserName': 'chrome',
		chromeOptions: {
			args: ["--headless", "--disable-gpu", "--window-size=800x600"]
		}
	},
*/		
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
		isVerbose: true,
		includeStackTrace: true,
		defaultTimeoutInterval: 120000
	}
};
