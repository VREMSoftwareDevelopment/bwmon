describe('Directives testing', function() {
	'use strict';

	beforeEach(module('BWMonApp.Directives'));
	beforeEach(module("my.templates"));

	describe('displayType', function() {
		var $compile,
			$scope,
			template = '<display_type/>',
			element;

		beforeEach(inject(function(_$compile_, _$rootScope_){
			$compile = _$compile_;
			$scope = _$rootScope_;

			element = $compile(template)($scope);
		}));

		it('should have element', function() {
			$scope.$digest();
			expect(element).toBeDefined();
		});

		it('should change showChart after click', function() {
			var button;

			$scope.showChart = false;
			$scope.$digest();

			button = element.find('button');
			expect(element.scope().showChart).toBe(false);

			button.triggerHandler('click');
			$scope.$digest();

			expect(element.scope().showChart).toBe(true);
			expect($scope.showChart).toBe(true);
		});
	});

	describe('selectYear', function() {
		var $compile,
			$scope,
			dataService,
			years = ['10', '5', '6'],
			template = '<select-year ng-model="myYear"/>',
			element;

		beforeEach(module('BWMonApp.DataService'));

		beforeEach(inject(function(_$compile_, _$rootScope_, _dataService_){
			$compile = _$compile_;
			$scope = _$rootScope_;

			dataService = _dataService_;
			spyOn(dataService, 'getYears').and.returnValue(years);

			element = $compile(template)($scope);
		}));

		it('should have element', function() {
			$scope.$digest();
			expect(element).toBeDefined();
		});

		it('should select first year in options', function() {
			var options;

			$scope.$digest();
			options = element.find('select').find('option');
			expect(options[0].selected).toBe(true);
			expect(options[0].text).toBe(years[0]);
		});

		it('should have all years in options', function() {
			var index, options;

			$scope.$digest();
			options = element.find('select').find('option');
			expect(options.length).toBe(years.length);
			for (index = 0; index < years.length; ++index) {
				expect(options[index].text).toBe(years[index]);
				expect(options[index].selected).toBe(index === 0 ? true : false);
			}
		});

	});
});
