describe('bwmon e2e usage by year, ', function() {

	beforeEach(function () {
		browser.get('http://localhost:8080/#/UsageByYear');
		browser.waitForAngular();
	});

	describe('data tab ', function() {
		it('should have data tab selected', function() {
			expect(element(by.id('Data')).getText()).toEqual('Data');
			expect(element(by.id('Data')).getAttribute('class')).toMatch('active');
			expect(element(by.id('Chart')).getAttribute('class')).not.toMatch('active');
		});

		it('should have data table', function() {
			var tableElement = element.all(by.repeater('current in usageByYearCtrl.data | orderBy:usageByYearCtrl.predicate:usageByYearCtrl.descending'));
			expect(tableElement.count()).toEqual(4);
		});

		it('should sort by year descending', function() {
			var tableElement = element.all(by.repeater('current in usageByYearCtrl.data | orderBy:usageByYearCtrl.predicate:usageByYearCtrl.descending'));
			expect(tableElement.first().getText()).toEqual('2013 603.928 35.773 639.701 1.753 365');
			expect(tableElement.last().getText()).toEqual('2010 0.000 0.000 0.000 0.000 365');
		});

		it('should sort by year ascending', function() {
			var tableElement = element.all(by.repeater('current in usageByYearCtrl.data | orderBy:usageByYearCtrl.predicate:usageByYearCtrl.descending'));
			element(by.id('yearSort')).click();
			expect(tableElement.first().getText()).toEqual('2010 0.000 0.000 0.000 0.000 365');
			expect(tableElement.last().getText()).toEqual('2013 603.928 35.773 639.701 1.753 365');
		});

		it('should sort by total descending', function() {
			var tableElement = element.all(by.repeater('current in usageByYearCtrl.data | orderBy:usageByYearCtrl.predicate:usageByYearCtrl.descending'));
			element(by.id('totalSort')).click();
			expect(tableElement.first().getText()).toEqual('2013 603.928 35.773 639.701 1.753 365');
			expect(tableElement.last().getText()).toEqual('2010 0.000 0.000 0.000 0.000 365');
		});

		it('should sort by total ascending', function() {
			var tableElement = element.all(by.repeater('current in usageByYearCtrl.data | orderBy:usageByYearCtrl.predicate:usageByYearCtrl.descending'));
			element(by.id('totalSort')).click();
			element(by.id('totalSort')).click();
			expect(tableElement.first().getText()).toEqual('2010 0.000 0.000 0.000 0.000 365');
			expect(tableElement.last().getText()).toEqual('2013 603.928 35.773 639.701 1.753 365');
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
			expect(element(by.model('usageByYearCtrl.selected.chartType')).element(by.css('option:checked')).getText()).toEqual('column');
		});

		it('should have chart data', function() {
			expect(element(by.id('chartData')).getAttribute('data')).toEqual('usageByYearCtrl.chartData');
			expect(element(by.id('chartData')).getAttribute('options')).toEqual('usageByYearCtrl.chartOptions');
		});
	});
});
