describe('BWMonApp.ChartType testing', function() {
	'use strict';

	var $rootScope,
		chartService,
		chartTypes = ['10', '5', '6'],
		template = '<div><chart-type ng-model="myType"></chart-type></div>',
		element;

	beforeEach(module('BWMonApp.ChartType'));
	beforeEach(module('BWMonApp.ChartService'));

	beforeEach(inject(function(_$compile_, _$rootScope_, _chartService_){
		$rootScope = _$rootScope_;

		chartService = _chartService_;
		spyOn(chartService, 'getChartTypes').and.returnValue(chartTypes);

		element = _$compile_(template)($rootScope);
	}));

	it('should have element', function() {
		$rootScope.$digest();
		expect(element).toBeDefined();
	});

	it('should call chartService.getChartTypes', function() {
		$rootScope.$digest();
		expect(chartService.getChartTypes).toHaveBeenCalled();
	});

	it('should select first chart type in options', function() {
		var options;

		$rootScope.$digest();
		options = element.find('select').find('option');
		expect(options[0].selected).toBeTruthy();
		expect(options[0].text).toBe(chartTypes[0]);
	});

	it('should have all chart types in options', function() {
		var index, options;

		$rootScope.$digest();
		options = element.find('select').find('option');
		expect(options.length).toBe(chartTypes.length);
		for (index = 0; index < chartTypes.length; ++index) {
			expect(options[index].text).toBe(chartTypes[index]);
			expect(options[index].selected).toBe(index === 0 ? true : false);
		}
	});
});
