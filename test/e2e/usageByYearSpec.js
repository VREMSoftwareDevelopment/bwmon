describe('bwmon e2e usage by year', function() {
	'use strict';

	var URL = 'http://localhost:8080/#/UsageByYear';

	beforeEach(function () {
		browser.get(URL);
		browser.waitForAngular();
	});

	describe('data', function() {
		it('should have show chart', function() {
			expect(element(by.id('buttonShowChart')).getText())
				.toEqual('Show Chart');
		});

		it('should have rows', function() {
			element.all(by.repeater('current in data | orderBy:predicate:reverse')).then(function(arr) {
				expect(arr.length).toEqual(4);
				expect(arr[0].getText()).toEqual('2013 603.928 35.773 639.701 1.753 365');
				expect(arr[1].getText()).toEqual('2012 413.485 23.242 436.727 1.193 366');
				expect(arr[2].getText()).toEqual('2011 139.939 10.745 150.684 0.413 365');
				expect(arr[3].getText()).toEqual('2010 0.000 0.000 0.000 0.000 365');
			});
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

		it('should have chart types', function() {
			 expect(element(by.model('chartSeries[0].type')).getText())
			 	.toEqual('columnlinearea');
		});

		it('should have chart type selected', function() {
			 expect(element(by.model('chartSeries[0].type')).element(by.css('option:checked')).getText())
			 	.toEqual('column');
		});

		it('should have chart', function() {
			var result = element(by.id('chartData'));
			expect(result.getAttribute('data')).toEqual('chartData');
			expect(result.getAttribute('options')).toEqual('chartOptions');
		});
	});

});
