describe('filter', function() {
	'use strict';

	beforeEach(module('BWMonApp.Filters'));

	describe('startFrom', function() {
		it('should slice array from startFrom', inject(function(startFromFilter) {
			var expected = [4,5,6,7],
				actual = startFromFilter([1,2,3,4,5,6,7], 3);

			expect(expected).toEqual(actual);
		}));
	});

	describe('toMonth', function() {
		it('should return december month as full name', inject(function(toMonthFilter) {
			var expected = 'December',
				actual = toMonthFilter(11);

			expect(expected).toEqual(actual);
		}));

		it('should return january month as full name', inject(function(toMonthFilter) {
			var expected = 'January',
				actual = toMonthFilter(0);

			expect(expected).toEqual(actual);
		}));
	});

	describe('timeToDate', function() {
		it('should return month as full name', inject(function(timeToDateFilter) {
			var expected = new Date(),
				actual = timeToDateFilter(expected.getTime()/1000);

			expect(expected).toEqual(actual);
		}));
	});

	describe('usageInGBytes', function() {
		it('should return value in GBytes', inject(function(usageInGBytesFilter) {
			var value = 123456789;
			expect(usageInGBytesFilter(value)).toEqual(123.457);
		}));
	});

});
