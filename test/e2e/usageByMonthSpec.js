describe('bwmon e2e usage by month', function() {
	'use strict';

	var URL = 'http://localhost:8080/#/UsageByMonth';

	beforeEach(function () {
		browser.get(URL);
		browser.waitForAngular();
	});

	it('should have year', function() {
		expect(element(by.selectedOption('year')).getText())
			.toEqual('2013');
		expect(element(by.select('year')).getText())
			.toEqual('2013201220112010');
	});

	describe('data', function() {
		it('should have show chart', function() {
			expect(element(by.id('buttonShowChart')).getText())
				.toEqual('Show Chart');
		});

		it('should have rows', function() {
			element.all(by.repeater('current in data | orderBy:predicate:reverse')).then(function(arr) {
				expect(arr.length).toEqual(11);
				expect(arr[0].getText()).toEqual('November 83.066 4.263 87.329 13.7% 2.911 30');
				expect(arr[10].getText()).toEqual('January 64.043 4.105 68.149 10.7% 2.198 31');
			});
		});

		it('should have totals', function() {
			expect(element(by.css('tfoot')).getText())
				.toEqual('2013 Totals 603.928 35.773 639.701 1.753 365');
		});
	});

	describe('chart', function() {
		beforeEach(function () {
			element(by.id('buttonShowChart')).click();
		});

		it('should have show chart', function() {
			expect(element(by.id('buttonShowChart')).getText())
				.toEqual('Show Data');
		});

		it('should have chart type', function() {
			expect(element(by.selectedOption('chartSeries[0].type')).getText())
				.toEqual('column');
			expect(element(by.select('chartSeries[0].type')).getText())
				.toEqual('columnlinearea');
		});

		it('should have chart', function() {
			var result = element(by.id('chartData'));
			expect(result.getAttribute('data')).toEqual('chartData');
			expect(result.getAttribute('options')).toEqual('chartOptions');
		});
	});

});
