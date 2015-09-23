describe('BWMonApp.SelectYear testing', function() {
	'use strict';

	var scope,
		chartService,
		chartTypes = ['10', '5', '6'],
		template = '<div><chart-type ng-model="myType"></chart-type></div>',
		element;

	beforeEach(module('BWMonApp.ChartType'));
	beforeEach(module('BWMonApp.ChartService'));
	beforeEach(module("my.templates"));

	beforeEach(inject(function($compile, $rootScope, _chartService_){
		scope = $rootScope;

		chartService = _chartService_;
		spyOn(chartService, 'getChartTypes').and.returnValue(chartTypes);

		element = $compile(template)(scope);
	}));

	it('should have element', function() {
		scope.$digest();
		expect(element).toBeDefined();
	});

	it('should select first chart type in options', function() {
		var options;

		scope.$digest();
		options = element.find('select').find('option');
		expect(options[0].selected).toBe(true);
		expect(options[0].text).toBe(chartTypes[0]);
	});

	it('should have all chart types in options', function() {
		var index, options;

		scope.$digest();
		options = element.find('select').find('option');
		expect(options.length).toBe(chartTypes.length);
		for (index = 0; index < chartTypes.length; ++index) {
			expect(options[index].text).toBe(chartTypes[index]);
			expect(options[index].selected).toBe(index === 0 ? true : false);
		}
	});
});
