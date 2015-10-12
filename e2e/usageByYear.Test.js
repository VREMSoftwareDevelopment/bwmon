describe('bwmon e2e usage by year, ', function() {
	var URL = 'http://localhost:8080/#/UsageByYear';

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
			element(by.id('Chart')).click();
		});

		it('should have text as Chart', function() {
			expect(element(by.id('Chart')).getText()).toEqual('Chart');
		});

		it('should have class as active', function() {
			expect(element(by.id('Chart')).getAttribute('class')).toMatch('active');
			expect(element(by.id('Data')).getAttribute('class')).not.toMatch('active');
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
