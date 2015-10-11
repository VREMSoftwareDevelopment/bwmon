describe('bwmon e2e usage by user', function() {
	var URL = 'http://localhost:8080/#/UsageByUser';

	beforeEach(function () {
		browser.get(URL);
		browser.waitForAngular();
	});

	it('should have year selected', function() {
		expect(element(by.model('selected.year')).element(by.css('option:checked')).getText())
			.toEqual('2013');
	});

	it('should have month selected', function() {
		expect(element(by.model('selected.month')).element(by.css('option:checked')).getText())
			.toEqual('November');
	});

	it('should have user selected', function() {
		expect(element(by.model('selected.user')).getText())
			.toEqual('');
	});

	describe('data', function() {
		it('should have show chart', function() {
			expect(element(by.id('buttonShowChart')).getText())
				.toEqual('Show Chart');
		});

		it('should have pagination', function() {
			element.all(by.css('.pagination li a')).then(function(arr) {
				expect(arr.length).toEqual(7);
				expect(arr[2].getText()).toEqual('1');
				expect(arr[3].getText()).toEqual('2');
				expect(arr[4].getText()).toEqual('3');
			});
		});

		it('should have rows', function() {
			element.all(by.repeater('current in data | orderBy:predicate:reverse | itemsPerPage:pageSize')).then(function(arr) {
				expect(arr.length).toEqual(12);
				expect(arr[0].getText()).toEqual('192.168.1.10 00:1C:25:27:9B:AE COMPUTER-3 15.004 0.973 15.978 18.3% 0.533 30 Nov 1, 2013 4:30:01 PM Nov 30, 2013 10:30:02 PM');
				expect(arr[11].getText()).toEqual('192.168.1.148 00:1A:A0:C7:17:60 COMPUTER-18 0.083 0.005 0.088 0.1% 0.003 30 Nov 1, 2013 4:30:01 PM Nov 30, 2013 10:30:02 PM');
			});
		});

		it('should have totals', function() {
			expect(element(by.css('tfoot')).getText())
				.toEqual('November 2013 Totals 83.066 4.263 87.329 2.911 30');
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

		it('should have chart type selected', function() {
			expect(element(by.model('selected.chartType')).element(by.css('option:checked')).getText())
				.toEqual('column');
		});

		it('should have chart', function() {
			var result = element(by.id('chartData'));
			expect(result.getAttribute('data')).toEqual('chartData');
			expect(result.getAttribute('options')).toEqual('chartOptions');
		});
	});

});
