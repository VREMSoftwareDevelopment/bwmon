describe('bwmon e2e usage by user, ', function() {
	var URL = 'http://localhost:8080/#/UsageByUser';

	beforeEach(function () {
		browser.get(URL);
		browser.waitForAngular();
	});

	describe('data tab ', function() {
		it('should have data tab selected', function() {
			expect(element(by.id('Data')).getText()).toEqual('Data');
			expect(element(by.id('Data')).getAttribute('class')).toMatch('active');
			expect(element(by.id('Chart')).getAttribute('class')).not.toMatch('active');
		});

		it('should have data table', function() {
			var tableElement = element.all(by.repeater('current in usageByUserCtrl.data | orderBy:usageByUserCtrl.predicate:usageByUserCtrl.descending | itemsPerPage:usageByUserCtrl.pageSize'));
			expect(tableElement.count()).toEqual(12);
			expect(tableElement.first().getText()).toEqual('192.168.1.10 00:1C:25:27:9B:AE COMPUTER-3 15.004 0.973 15.978 18.3% 0.533 30 Nov 1, 2013 4:30:01 PM Nov 30, 2013 10:30:02 PM');
			expect(tableElement.last().getText()).toEqual('192.168.1.148 00:1A:A0:C7:17:60 COMPUTER-18 0.083 0.005 0.088 0.1% 0.003 30 Nov 1, 2013 4:30:01 PM Nov 30, 2013 10:30:02 PM');
			expect(element(by.css('tfoot')).getText()).toEqual('November 2013 Totals 83.066 4.263 87.329 2.911 30');
		});

		it('should sort by IP', function() {
			var tableElement = element.all(by.repeater('current in usageByUserCtrl.data | orderBy:usageByUserCtrl.predicate:usageByUserCtrl.descending | itemsPerPage:usageByUserCtrl.pageSize'));
			element(by.id('IPSort')).click();
			expect(tableElement.first().getText()).toEqual('192.168.2.146 0C:EE:E6:80:C8:8C COMPUTER-27 0.573 0.025 0.597 0.7% 0.020 30 Nov 1, 2013 4:30:01 PM Nov 30, 2013 10:30:02 PM');
			expect(tableElement.last().getText()).toEqual('192.168.1.21 40:6F:2A:54:D9:EB COMPUTER-2 1.407 0.112 1.518 1.7% 0.051 30 Nov 1, 2013 4:30:01 PM Nov 30, 2013 10:30:02 PM');
		});

		it('should sort by MAC', function() {
			var tableElement = element.all(by.repeater('current in usageByUserCtrl.data | orderBy:usageByUserCtrl.predicate:usageByUserCtrl.descending | itemsPerPage:usageByUserCtrl.pageSize'));
			element(by.id('MACSort')).click();
			expect(tableElement.first().getText()).toEqual('192.168.1.133 00:19:B9:03:00:D7 COMPUTER-22 0.006 0.000 0.006 0.0% 0.000 30 Nov 1, 2013 4:30:01 PM Nov 30, 2013 10:30:02 PM');
			expect(tableElement.last().getText()).toEqual('192.168.1.120 00:26:6C:A8:EE:D6 COMPUTER-21 0.089 0.003 0.092 0.1% 0.003 30 Nov 1, 2013 4:30:01 PM Nov 30, 2013 10:30:02 PM');
		});

		it('should sort by USER', function() {
			var tableElement = element.all(by.repeater('current in usageByUserCtrl.data | orderBy:usageByUserCtrl.predicate:usageByUserCtrl.descending | itemsPerPage:usageByUserCtrl.pageSize'));
			element(by.id('userSort')).click();
			expect(tableElement.first().getText()).toEqual('192.168.1.14 00:24:8D:28:F2:9A COMPUTER-1 0.203 0.012 0.214 0.2% 0.007 30 Nov 1, 2013 4:30:01 PM Nov 30, 2013 10:30:02 PM');
			expect(tableElement.last().getText()).toEqual('192.168.1.21 40:6F:2A:54:D9:EB COMPUTER-2 1.407 0.112 1.518 1.7% 0.051 30 Nov 1, 2013 4:30:01 PM Nov 30, 2013 10:30:02 PM');
		});

		it('should sort by total', function() {
			var tableElement = element.all(by.repeater('current in usageByUserCtrl.data | orderBy:usageByUserCtrl.predicate:usageByUserCtrl.descending | itemsPerPage:usageByUserCtrl.pageSize'));
			element(by.id('totalSort')).click();
			expect(tableElement.first().getText()).toEqual('192.168.1.28 94:EB:CD:3D:82:CD COMPUTER-14 0.000 0.000 0.000 0.0% 0.000 30 Nov 1, 2013 4:30:01 PM Nov 30, 2013 10:30:02 PM');
			expect(tableElement.last().getText()).toEqual('192.168.1.22 90:4C:E5:A6:91:FA COMPUTER-6 0.174 0.014 0.188 0.2% 0.006 30 Nov 1, 2013 4:30:01 PM Nov 30, 2013 10:30:02 PM');
		});

		it('should have year selected', function() {
			expect(element.all(by.model('usageByUserCtrl.selected.year')).first().element(by.css('option:checked')).getText()).toEqual('2013');
		});

		it('should have month selected', function() {
			expect(element.all(by.model('usageByUserCtrl.selected.month')).first().element(by.css('option:checked')).getText()).toEqual('November');
		});

		it('should have user selected', function() {
			expect(element.all(by.model('usageByUserCtrl.selected.user')).first().getText()).toEqual('');
		});

		it('should have pagination', function() {
			var pagination = element.all(by.css('.pagination li a'));
			expect(pagination.count()).toEqual(7);
			expect(pagination.get(2).getText()).toEqual('1');
			expect(pagination.get(3).getText()).toEqual('2');
			expect(pagination.get(4).getText()).toEqual('3');
		});

		it('should show different information when changing year', function() {
			var yearElement = element.all(by.model('usageByUserCtrl.selected.year')).first(),
				tableElement = element.all(by.repeater('current in usageByUserCtrl.data | orderBy:usageByUserCtrl.predicate:usageByUserCtrl.descending | itemsPerPage:usageByUserCtrl.pageSize'));
			yearElement.element(by.cssContainingText('option', '2011')).click();
			expect(yearElement.element(by.css('option:checked')).getText()).toEqual('2011');
			expect(tableElement.count()).toEqual(7);
			expect(tableElement.first().getText()).toEqual('192.168.1.10 00:1C:25:27:9B:AE COMPUTER-3 12.806 1.016 13.822 57.9% 0.446 31 Dec 1, 2011 11:30:02 AM Dec 31, 2011 11:30:01 PM');
			expect(tableElement.last().getText()).toEqual('192.168.1.25 70:D4:F2:DA:FA:C9 COMPUTER-15 0.863 0.018 0.881 3.7% 0.088 10 Dec 21, 2011 8:00:01 PM Dec 31, 2011 12:30:01 PM');
			expect(element(by.css('tfoot')).getText()).toEqual('December 2011 Totals 21.926 1.937 23.863 0.770 31');
		});

		it('should show different information when changing month', function() {
			var monthElement = element.all(by.model('usageByUserCtrl.selected.month')).first(),
				tableElement = element.all(by.repeater('current in usageByUserCtrl.data | orderBy:usageByUserCtrl.predicate:usageByUserCtrl.descending | itemsPerPage:usageByUserCtrl.pageSize'));
			monthElement.element(by.cssContainingText('option', 'August')).click();
			expect(monthElement.element(by.css('option:checked')).getText()).toEqual('August');
			expect(tableElement.count()).toEqual(9);
			expect(tableElement.first().getText()).toEqual('192.168.1.10 00:1C:25:27:9B:AE COMPUTER-3 10.481 0.204 10.685 29.1% 0.356 30 Aug 1, 2013 7:30:02 PM Aug 30, 2013 11:00:07 PM');
			expect(tableElement.last().getText()).toEqual('192.168.1.27 10:D5:42:88:3F:A0 COMPUTER-16 0.853 0.066 0.919 2.5% 0.033 28 Aug 1, 2013 8:00:02 PM Aug 29, 2013 3:00:02 PM');
			expect(element(by.css('tfoot')).getText()).toEqual('August 2013 Totals 34.516 2.147 36.664 1.183 31');
		});

		it('should show different information when changing user', function() {
			var userElement = element.all(by.model('usageByUserCtrl.selected.user')).first(),
				tableElement = element.all(by.repeater('current in usageByUserCtrl.data | orderBy:usageByUserCtrl.predicate:usageByUserCtrl.descending | itemsPerPage:usageByUserCtrl.pageSize'));
			userElement.sendKeys('11');
			expect(userElement.getAttribute('value')).toEqual('11');
			expect(tableElement.count()).toEqual(5);
			expect(tableElement.first().getText()).toEqual('192.168.1.11 70:5A:B6:F3:58:AB COMPUTER-12 0.120 0.003 0.123 0.1% 0.004 30 Nov 1, 2013 4:30:01 PM Nov 30, 2013 10:30:02 PM');
			expect(tableElement.last().getText()).toEqual('192.168.1.16 00:90:A9:C6:19:5B COMPUTER-11 0.055 0.001 0.056 0.1% 0.002 30 Nov 1, 2013 4:30:01 PM Nov 30, 2013 10:30:02 PM');
			expect(element(by.css('tfoot')).getText()).toEqual('November 2013 Totals 83.066 4.263 87.329 2.911 30');
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
			expect(element(by.model('usageByUserCtrl.selected.chartType')).element(by.css('option:checked')).getText()).toEqual('column');
		});

		it('should have year select', function() {
			expect(element.all(by.model('usageByUserCtrl.selected.year')).last().element(by.css('option:checked')).getText()).toEqual('2013');
		});

		it('should have month selected', function() {
			expect(element.all(by.model('usageByUserCtrl.selected.month')).last().element(by.css('option:checked')).getText()).toEqual('November');
		});

		it('should have user selected', function() {
			expect(element.all(by.model('usageByUserCtrl.selected.user')).last().getText()).toEqual('');
		});

		it('should have chart type selected', function() {
			expect(element(by.model('usageByUserCtrl.selected.chartType')).element(by.css('option:checked')).getText()).toEqual('column');
		});

		it('should have chart data', function() {
			expect(element(by.id('chartData')).getAttribute('data')).toEqual('usageByUserCtrl.chartData');
			expect(element(by.id('chartData')).getAttribute('options')).toEqual('usageByUserCtrl.chartOptions');
		});
	});

});
