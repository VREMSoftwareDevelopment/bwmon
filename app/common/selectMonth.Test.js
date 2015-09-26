describe('BWMonApp.SelectMonth testing', function() {
	'use strict';

	var $rootScope,
		dataService,
		year = 1,
		months = ['Jan', 'Mar', 'Jun'],
		template = '<div><select-month ng-model="myMonth" year="1"></select-month></div>',
		element;

	beforeEach(module('BWMonApp.SelectMonth'));
	beforeEach(module('BWMonApp.DataService'));

	beforeEach(inject(function(_$compile_, _$rootScope_, _dataService_){
		$rootScope = _$rootScope_;

		dataService = _dataService_;
		spyOn(dataService, 'getMonths').and.returnValue(months);

		element = _$compile_(template)($rootScope);
	}));

	it('should have element', function() {
		$rootScope.$digest();
		expect(element).toBeDefined();
	});

	it('should call dataService.getMonths with parameter year', function() {
		$rootScope.$digest();
		expect(dataService.getMonths).toHaveBeenCalledWith(year);
	});

	it('should select first month in options', function() {
		var options;
		$rootScope.$digest();
		options = element.find('select').find('option');
		expect(options[0].selected).toBeTruthy();
		expect(options[0].text).toBe(months[0]);
	});

	it('should have all months in options', function() {
		var index, options;
		$rootScope.$digest();
		options = element.find('select').find('option');
		expect(options.length).toBe(months.length);
		for (index = 0; index < months.length; ++index) {
			expect(options[index].text).toBe(months[index]);
			expect(options[index].selected).toBe(index === 0 ? true : false);
		}
	});
});
