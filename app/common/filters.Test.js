describe('BWMonApp.Filters module, ', function() {

	beforeEach(module('BWMonApp.Filters'));

	it('startFrom filter should slice array from startFrom', inject(function(startFromFilter) {
		expect(startFromFilter([1,2,3,4,5,6,7], 3)).toEqual([4,5,6,7]);
	}));

	it('toMonth filter should return december month as full name', inject(function(toMonthFilter) {
		expect(toMonthFilter(11)).toEqual('December');
	}));

	it('toMonth filter should return january month as full name', inject(function(toMonthFilter) {
		expect(toMonthFilter(0)).toEqual('January');
	}));

	it('timeToDate filter should return month as full name', inject(function(timeToDateFilter) {
		var date = new Date();
		expect(timeToDateFilter(date.getTime()/1000)).toEqual(date);
	}));

	it('usageInGBytes filter should return value in GBytes', inject(function(usageInGBytesFilter) {
		expect(usageInGBytesFilter(123456789)).toEqual(123.457);
	}));

});
