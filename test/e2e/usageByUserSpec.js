describe('bwmon e2e usage by user', function() {
	'use strict';

	var URL = 'http://localhost:8080/#/UsageByUser';
		
	beforeEach(function () {
		browser.get(URL);
		browser.waitForAngular();
	});

	describe('data tests', function() {
		it('should have all input fields', function() {
			expect(element(by.id('buttonShowChart')).getText()).toEqual('Show Chart');
			expect(element(by.selectedOption('selected.year')).getText()).toEqual('2013');
			expect(element(by.selectedOption('selected.month')).getText()).toEqual('November');
			expect(element(by.model('selected.filter')).getText()).toEqual('');
			expect(element(by.id('buttonPrevious')).getText()).toEqual('Previous');
			expect(element(by.id('buttonNext')).getText()).toEqual('Next');
		});
		
		it('should have previous page button', function() {
			expect(element(by.id('buttonPrevious')).getText()).toEqual('Previous');
		});

		it('should have next page button', function() {
			expect(element(by.id('buttonNext')).getText()).toEqual('Next');
		});
	});
	
	describe('chart tests', function() {
		beforeEach(function () {
			element(by.id('buttonShowChart')).click();
		});
		
		it('should have all input fields', function() {
			expect(element(by.id('buttonShowChart')).getText()).toEqual('Show Data');
			expect(element(by.selectedOption('selected.year')).getText()).toEqual('2013');
			expect(element(by.selectedOption('selected.month')).getText()).toEqual('November');
			expect(element(by.model('selected.filter')).getText()).toEqual('');
			expect(element(by.selectedOption('chartSeries[0].type')).getText()).toEqual('column');
		});
	});
});
