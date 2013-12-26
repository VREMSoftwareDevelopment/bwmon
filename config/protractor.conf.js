exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	capabilities: {
		'browserName': 'chrome'
	},
	specs: [
		'../test/e2e/*Spec.js'
	],
	jasmineNodeOpts: {
		showColors: true
	}
};