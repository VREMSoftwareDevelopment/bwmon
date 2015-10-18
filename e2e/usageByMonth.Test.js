describe('bwmon e2e usage by month, ', function() {
	beforeEach(function () {
		browser.get('http://localhost:8080/#/UsageByMonth');
		browser.waitForAngular();
	});

	describe('data tab ', function() {
		it('should have data tab selected', function() {
			expect(element(by.id('Data')).getText()).toEqual('Data');
			expect(element(by.id('Data')).getAttribute('class')).toMatch('active');
			expect(element(by.id('Chart')).getAttribute('class')).not.toMatch('active');
		});

		it('should have data table', function() {
			var tableElement = element.all(by.repeater('current in usageByMonthCtrl.data | orderBy:predicate:usageByMonthCtrl.reverse'));
			expect(tableElement.count()).toEqual(11);
			expect(tableElement.first().getText()).toEqual('November 83.066 4.263 87.329 13.7% 2.911 30');
			expect(tableElement.last().getText()).toEqual('January 64.043 4.105 68.149 10.7% 2.198 31');
			expect(element(by.css('tfoot')).getText()).toEqual('2013 Totals 603.928 35.773 639.701 1.753 365');
		});

		it('should sort by month', function() {
			var tableElement = element.all(by.repeater('current in usageByMonthCtrl.data | orderBy:predicate:usageByMonthCtrl.reverse'));
			element(by.id('monthSort')).click();
			element(by.id('monthSort')).click();
			expect(tableElement.first().getText()).toEqual('January 64.043 4.105 68.149 10.7% 2.198 31');
			expect(tableElement.last().getText()).toEqual('November 83.066 4.263 87.329 13.7% 2.911 30');
		});

		it('should sort by total', function() {
			var tableElement = element.all(by.repeater('current in usageByMonthCtrl.data | orderBy:predicate:usageByMonthCtrl.reverse'));
			element(by.id('totalSort')).click();
			expect(tableElement.first().getText()).toEqual('November 83.066 4.263 87.329 13.7% 2.911 30');
			expect(tableElement.last().getText()).toEqual('August 34.516 2.147 36.664 5.7% 1.183 31');
		});

		it('should have year select', function() {
			expect(element.all(by.model('usageByMonthCtrl.selected.year')).first().element(by.css('option:checked')).getText()).toEqual('2013');
		});

		it('should show different information when changing year', function() {
			var yearElement = element.all(by.model('usageByMonthCtrl.selected.year')).first(),
				tableElement = element.all(by.repeater('current in usageByMonthCtrl.data | orderBy:predicate:usageByMonthCtrl.reverse'));
			yearElement.element(by.cssContainingText('option', '2011')).click();
			expect(yearElement.element(by.css('option:checked')).getText()).toEqual('2011');
			expect(tableElement.count()).toEqual(7);
			expect(tableElement.first().getText()).toEqual('December 21.926 1.937 23.863 15.8% 0.770 31');
			expect(tableElement.last().getText()).toEqual('June 26.949 2.086 29.035 19.3% 0.968 30');
			expect(element(by.css('tfoot')).getText()).toEqual('2011 Totals 603.928 35.773 639.701 1.753 365');
		});
	});

	describe('chart tab ', function() {
		beforeEach(function () {
			element(by.id('Chart')).click();
		});

		it('should have chart tab selected', function() {
			expect(element(by.id('Chart')).getText()).toEqual('Chart');
			expect(element(by.id('Chart')).getAttribute('class')).toMatch('active');
			expect(element(by.id('Data')).getAttribute('class')).not.toMatch('active');
		});

		it('should have chart type select', function() {
			expect(element(by.model('usageByMonthCtrl.selected.chartType')).element(by.css('option:checked')).getText()).toEqual('column');
		});

		it('should have year select', function() {
			expect(element.all(by.model('usageByMonthCtrl.selected.year')).last().element(by.css('option:checked')).getText()).toEqual('2013');
		});

		it('should have chart data', function() {
			expect(element(by.id('chartData')).getAttribute('data')).toEqual('usageByMonthCtrl.chartData');
			expect(element(by.id('chartData')).getAttribute('options')).toEqual('usageByMonthCtrl.chartOptions');
		});
	});

});
