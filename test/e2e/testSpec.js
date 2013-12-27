describe('bwmon home page', function() {
	'use strict';

/*
 * test is broken in Windows
 *
 */
	var URL = 'http://localhost:8080';

	beforeEach(function () {
		browser.get(URL);
		browser.waitForAngular();
	});

	it('should default to Usage By User', function() {
		var t1 = Protractor.By.className('container');
		console.log(t1);

		var e1 = browser.findElement(t1);
		console.log(e1);

		var result = e1.getText();
		console.log(result);
	});
});