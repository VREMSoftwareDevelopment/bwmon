describe('bwmon e2e routes tests', function() {
	'use strict';

	var URL = 'http://localhost:8080/';

	it('should default to Usage By User page', function() {
		browser.get(URL);
		browser.waitForAngular();
		expect(browser.getCurrentUrl()).toEqual(URL+'#/UsageByUser');
	});

	it('should switch to Usage By User page', function() {
		browser.get(URL+'#/UsageByUser');
		browser.waitForAngular();
		expect(browser.getCurrentUrl()).toEqual(URL+'#/UsageByUser');
	});

	it('should switch to Usage By Month page', function() {
		browser.get(URL+'#/UsageByMonth');
		browser.waitForAngular();
		expect(browser.getCurrentUrl()).toEqual(URL+'#/UsageByMonth');
	});

	it('should switch to Usage By Year page', function() {
		browser.get(URL+'#/UsageByYear');
		browser.waitForAngular();
		expect(browser.getCurrentUrl()).toEqual(URL+'#/UsageByYear');
	});

});