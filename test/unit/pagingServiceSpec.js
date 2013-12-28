describe('BWMonApp.services PagingService', function() {
	'use strict';

	var PagingService = null,
		data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];

	beforeEach(module('BWMonApp.services'));
	beforeEach(inject(function(_PagingService_){
		PagingService =_PagingService_;
	}));

	it('should return current page', function() {
		expect(0).toEqual(PagingService.getPaging().current);
	});

	it('should return size - row per page', function() {
		expect(12).toEqual(PagingService.getPaging().size);
	});

	it('should return 0 using startIndex for the first page', function() {
		expect(0).toEqual(PagingService.getPaging().startIndex());
	});

	it('should return 12 using startIndex for the second page', function() {
		var page = PagingService.getPaging();
		page.next(data);
		expect(12).toEqual(page.startIndex());
	});

	it('should return 3 using pages with given data', function() {
		expect(3).toEqual(PagingService.getPaging().pages(data));
	});

	it('should return 0 using pages with empty data', function() {
		expect(0).toEqual(PagingService.getPaging().pages([]));
	});

	it('should return true using hasPages with given data', function() {
		expect(true).toBe(PagingService.getPaging().hasPages(data));
	});

	it('should return false using hasPages with empty data', function() {
		expect(false).toBe(PagingService.getPaging().hasPages([]));
	});

	it('should return false using hasPrevious on the first page', function() {
		expect(false).toBe(PagingService.getPaging().hasPrevious());
	});

	it('should return true using hasPrevious on the second page', function() {
		var page = PagingService.getPaging();
		page.next(data);
		expect(true).toEqual(page.hasPrevious());
	});

	it('should return true using hasNext with given data', function() {
		expect(true).toBe(PagingService.getPaging().hasNext(data));
	});

	it('should return false using hasNext with empty data', function() {
		expect(false).toBe(PagingService.getPaging().hasNext([]));
	});

	it('should increment current page usign next with given data', function() {
		var page = PagingService.getPaging();
		expect(0).toBe(page.current);
		page.next(data);
		expect(1).toBe(page.current);
	});

	it('should not increment current page using next on the last page', function() {
		var page = PagingService.getPaging();
		expect(0).toBe(page.current);
		page.next([]);
		expect(0).toBe(page.current);
	});

	it('should decrement current page using previous with given data', function() {
		var page = PagingService.getPaging();
		page.current = 1;
		expect(1).toBe(page.current);
		page.previous();
		expect(0).toBe(page.current);
	});

	it('should not decrement current page using previous on the first page', function() {
		var page = PagingService.getPaging();
		expect(0).toBe(page.current);
		page.previous();
		expect(0).toBe(page.current);
	});


});
