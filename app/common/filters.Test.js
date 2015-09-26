describe('Filters testing', function() {
	'use strict';

	beforeEach(module('BWMonApp.Filters'));

	describe('startFrom', function() {
		it('should slice array from startFrom', inject(function(startFromFilter) {
			expect(startFromFilter([1,2,3,4,5,6,7], 3)).toEqual([4,5,6,7]);
		}));
	});

	describe('toMonth', function() {
		it('should return december month as full name', inject(function(toMonthFilter) {
			expect(toMonthFilter(11)).toEqual('December');
		}));

		it('should return january month as full name', inject(function(toMonthFilter) {
			expect(toMonthFilter(0)).toEqual('January');
		}));
	});

	describe('timeToDate', function() {
		it('should return month as full name', inject(function(timeToDateFilter) {
			var date = new Date();
			expect(timeToDateFilter(date.getTime()/1000)).toEqual(date);
		}));
	});

	describe('usageInGBytes', function() {
		it('should return value in GBytes', inject(function(usageInGBytesFilter) {
			var value = 123456789;
			expect(usageInGBytesFilter(value)).toEqual(123.457);
		}));
	});

});
