describe('BWMonApp.services pagingService', function() {
	'use strict';

	var pagingService = null,
		data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];

	beforeEach(module('BWMonApp.PagingService'));
	beforeEach(inject(function(_pagingService_){
		pagingService =_pagingService_;
	}));

	it('should return current page', function() {
		expect(pagingService.getPaging().current).toEqual(0);
	});

	it('should return size - row per page', function() {
		expect(pagingService.getPaging().size).toEqual(12);
	});

	it('should return 0 using startIndex for the first page', function() {
		expect(pagingService.getPaging().startIndex()).toEqual(0);
	});

	it('should return 12 using startIndex for the second page', function() {
		var page = pagingService.getPaging();
		page.next(data);
		expect(page.startIndex()).toEqual(12);
	});

	it('should return 3 using pages with given data', function() {
		expect(pagingService.getPaging().pages(data)).toEqual(3);
	});

	it('should return 0 using pages with empty data', function() {
		expect(pagingService.getPaging().pages([])).toEqual(0);
	});

	it('should return true using hasPages with given data', function() {
		expect(pagingService.getPaging().hasPages(data)).toBeTruthy();
	});

	it('should return false using hasPages with empty data', function() {
		expect(pagingService.getPaging().hasPages([])).toBeFalsy();
	});

	it('should return false using hasPrevious on the first page', function() {
		expect(pagingService.getPaging().hasPrevious()).toBeFalsy();
	});

	it('should return true using hasPrevious on the second page', function() {
		var page = pagingService.getPaging();
		page.next(data);
		expect(page.hasPrevious()).toBeTruthy();
	});

	it('should return true using hasNext with given data', function() {
		expect(pagingService.getPaging().hasNext(data)).toBeTruthy();
	});

	it('should return false using hasNext with empty data', function() {
		expect(pagingService.getPaging().hasNext([])).toBeFalsy();
	});

	it('should increment current page usign next with given data', function() {
		var page = pagingService.getPaging();
		expect(page.current).toBe(0);
		page.next(data);
		expect(page.current).toBe(1);
	});

	it('should not increment current page using next on the last page', function() {
		var page = pagingService.getPaging();
		expect(page.current).toBe(0);
		page.next([]);
		expect(page.current).toBe(0);
	});

	it('should decrement current page using previous with given data', function() {
		var page = pagingService.getPaging();
		page.current = 1;
		expect(page.current).toBe(1);
		page.previous();
		expect(page.current).toBe(0);
	});

	it('should not decrement current page using previous on the first page', function() {
		var page = pagingService.getPaging();
		expect(page.current).toBe(0);
		page.previous();
		expect(page.current).toBe(0);
	});

	it('should reset current to zero', function() {
		var page = pagingService.getPaging();
		page.current = 100;
		page.reset();
		expect(page.current).toBe(0);
	});

});
