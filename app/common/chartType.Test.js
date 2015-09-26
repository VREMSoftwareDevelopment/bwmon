describe('BWMonApp.ChartType testing', function() {
	'use strict';

	var scope,
		chartService,
		chartTypes = ['10', '5', '6'],
		template = '<div><chart-type ng-model="myType"></chart-type></div>',
		element;

	beforeEach(module('BWMonApp.ChartType'));
	beforeEach(module('BWMonApp.ChartService'));

	beforeEach(inject(function(_$compile_, _$rootScope_, _chartService_){
		scope = _$rootScope_.$new();

		chartService = _chartService_;
		spyOn(chartService, 'getChartTypes').and.returnValue(chartTypes);

		element = _$compile_(template)(scope);
	}));

	it('should have element', function() {
		scope.$digest();
		expect(element).toBeDefined();
	});

	it('should call chartService.getChartTypes', function() {
		scope.$digest();
		expect(chartService.getChartTypes).toHaveBeenCalled();
	});

	it('should select first chart type in options', function() {
		var options;

		scope.$digest();
		options = element.find('select').find('option');
		expect(options[0].selected).toBeTruthy();
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
