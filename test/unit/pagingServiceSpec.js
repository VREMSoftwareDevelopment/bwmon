describe('BWMonApp.services pagingService', function() {
	'use strict';

	var pagingService = null,
		data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];

	beforeEach(module('BWMonApp.pagingService'));
	beforeEach(inject(function(_pagingService_){
		pagingService =_pagingService_;
	}));

	it('should return current page', function() {
		expect(0).toEqual(pagingService.getPaging().current);
	});

	it('should return size - row per page', function() {
		expect(12).toEqual(pagingService.getPaging().size);
	});

	it('should return 0 using startIndex for the first page', function() {
		expect(0).toEqual(pagingService.getPaging().startIndex());
	});

	it('should return 12 using startIndex for the second page', function() {
		var page = pagingService.getPaging();
		page.next(data);
		expect(12).toEqual(page.startIndex());
	});

	it('should return 3 using pages with given data', function() {
		expect(3).toEqual(pagingService.getPaging().pages(data));
	});

	it('should return 0 using pages with empty data', function() {
		expect(0).toEqual(pagingService.getPaging().pages([]));
	});

	it('should return true using hasPages with given data', function() {
		expect(true).toBe(pagingService.getPaging().hasPages(data));
	});

	it('should return false using hasPages with empty data', function() {
		expect(false).toBe(pagingService.getPaging().hasPages([]));
	});

	it('should return false using hasPrevious on the first page', function() {
		expect(false).toBe(pagingService.getPaging().hasPrevious());
	});

	it('should return true using hasPrevious on the second page', function() {
		var page = pagingService.getPaging();
		page.next(data);
		expect(true).toEqual(page.hasPrevious());
	});

	it('should return true using hasNext with given data', function() {
		expect(true).toBe(pagingService.getPaging().hasNext(data));
	});

	it('should return false using hasNext with empty data', function() {
		expect(false).toBe(pagingService.getPaging().hasNext([]));
	});

	it('should increment current page usign next with given data', function() {
		var page = pagingService.getPaging();
		expect(0).toBe(page.current);
		page.next(data);
		expect(1).toBe(page.current);
	});

	it('should not increment current page using next on the last page', function() {
		var page = pagingService.getPaging();
		expect(0).toBe(page.current);
		page.next([]);
		expect(0).toBe(page.current);
	});

	it('should decrement current page using previous with given data', function() {
		var page = pagingService.getPaging();
		page.current = 1;
		expect(1).toBe(page.current);
		page.previous();
		expect(0).toBe(page.current);
	});

	it('should not decrement current page using previous on the first page', function() {
		var page = pagingService.getPaging();
		expect(0).toBe(page.current);
		page.previous();
		expect(0).toBe(page.current);
	});


});
