describe('Directives testing', function() {
	'use strict';

	beforeEach(module('BWMonApp.Directives'));
	beforeEach(module("my.templates"));

	describe('selectYear', function() {
		var scope,
			dataService,
			years = ['10', '5', '6'],
			template = '<div><select-year ng-model="myYear"></select-year></div>',
			element;

		beforeEach(module('BWMonApp.DataService'));

		beforeEach(inject(function($compile, $rootScope, _dataService_){
			scope = $rootScope;

			dataService = _dataService_;
			spyOn(dataService, 'getYears').and.returnValue(years);

			element = $compile(template)(scope);
		}));

		it('should have element', function() {
			scope.$digest();
			expect(element).toBeDefined();
		});

		it('should select first year in options', function() {
			var options;

			scope.$digest();
			options = element.find('select').find('option');
			expect(options[0].selected).toBe(true);
			expect(options[0].text).toBe(years[0]);
		});

		it('should have all years in options', function() {
			var index, options;

			scope.$digest();
			options = element.find('select').find('option');
			expect(options.length).toBe(years.length);
			for (index = 0; index < years.length; ++index) {
				expect(options[index].text).toBe(years[index]);
				expect(options[index].selected).toBe(index === 0 ? true : false);
			}
		});

	});
});
