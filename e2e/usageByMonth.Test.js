describe('bwmon e2e usage by month, ', function() {
	var URL = 'http://localhost:8080/#/UsageByMonth';

	beforeEach(function () {
		browser.get(URL);
		browser.waitForAngular();
	});

	describe('data', function() {
		it('should have text as Data', function() {
			expect(element(by.id('Data')).getText()).toEqual('Data');
		});

		it('should have class as active', function() {
			expect(element(by.id('Data')).getAttribute('class')).toMatch('active');
			expect(element(by.id('Chart')).getAttribute('class')).not.toMatch('active');
		});

		it('should have year selected', function() {
			expect(element.all(by.model('usageByMonthCtrl.selected.year')).first().element(by.css('option:checked')).getText())
				.toEqual('2013');
		});

		it('should have rows', function() {
			element.all(by.repeater('current in usageByMonthCtrl.data | orderBy:predicate:usageByMonthCtrl.reverse')).then(function(arr) {
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
			element(by.id('Chart')).click();
		});

		it('should have text as Chart', function() {
			expect(element(by.id('Chart')).getText()).toEqual('Chart');
		});

		it('should have class as active', function() {
			expect(element(by.id('Chart')).getAttribute('class')).toMatch('active');
			expect(element(by.id('Data')).getAttribute('class')).not.toMatch('active');
		});

		it('should have year selected', function() {
			expect(element.all(by.model('usageByMonthCtrl.selected.year')).last().element(by.css('option:checked')).getText())
				.toEqual('2013');
		});

		it('should have chart type selected', function() {
			expect(element(by.model('usageByMonthCtrl.selected.chartType')).element(by.css('option:checked')).getText())
				.toEqual('column');
		});

		it('should have chart', function() {
			var result = element(by.id('chartData'));
			expect(result.getAttribute('data')).toEqual('usageByMonthCtrl.chartData');
			expect(result.getAttribute('options')).toEqual('usageByMonthCtrl.chartOptions');
		});
	});

});
