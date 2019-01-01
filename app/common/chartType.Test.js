describe('BWMonApp.ChartType module, chartType directive ', function() {
	var scope,
		chartService,
		chartTypes,
		template,
		controller,
		element;

	beforeEach(module('BWMonApp.ChartType'));
	beforeEach(module('BWMonApp.ChartService'));

	beforeEach(inject(function(_$compile_, _$rootScope_, _chartService_){
		chartTypes = ['10', '5', '6'];
		template = angular.element('<chart-type ng-model="myType"></chart-type>');

		scope = _$rootScope_.$new();
		scope.myType = chartTypes[0];

		chartService = _chartService_;
		spyOn(chartService, 'getChartTypes').and.returnValue(chartTypes);

		element = _$compile_(template)(scope);
		controller = template.controller('chartType');
	}));

	it('should have element', function() {
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.attr('ng-options')).toBe('choiceChartType for choiceChartType in ::chartTypeCtrl.chartTypes');
	});

	it('should call chartService.getChartTypes', function() {
		scope.$digest();
		expect(chartService.getChartTypes).toHaveBeenCalled();
	});

	it('should select first chart type in options', function() {
		var options;

		scope.$digest();
		options = element.find('option');
		expect(options[0].selected).toBeTruthy();
		expect(options[0].text).toBe(chartTypes[0]);
		expect(controller.chartType).toBe(chartTypes[0]);
	});

	it('should have all chart types in options', function() {
		var index, options;

		scope.$digest();
		options = element.find('option');
		expect(options.length).toBe(chartTypes.length);
		expect(controller.chartTypes.length).toBe(chartTypes.length);
		for (index = 0; index < chartTypes.length; ++index) {
			expect(options[index].text).toBe(chartTypes[index]);
			expect(controller.chartTypes[index]).toBe(chartTypes[index]);
			expect(options[index].selected).toBe(index === 0 ? true : false);
		}
	});
});
