describe('BWMonApp UsageByMonth feature', function() {
	'use strict';

	var scope,
		compile,
		usageData = {
			data: {
				usage: 5,
				total: 10
			},
			chartData: 23
		},
		chartOptions = {
			series: [{
				type: 'type'
			}]
		},
		chartService,
		dataService;

	beforeEach(module('BWMonApp.DataService'));
	beforeEach(module('BWMonApp.ChartService'));
	beforeEach(module('BWMonApp.UsageByMonth'));
	beforeEach(module('BWMonApp.Filters'));

	beforeEach(inject(function(_$compile_, _$rootScope_, _$controller_, _dataService_, _chartService_){
		compile = _$compile_;
		scope = _$rootScope_.$new();

		dataService = _dataService_;
		spyOn(dataService, 'getUsageByMonth').and.returnValue(usageData);

		chartService = _chartService_;
		spyOn(chartService, 'getChartOptions').and.returnValue(chartOptions);

		_$controller_('UsageByMonthController', {
			$scope: scope,
			dataService: dataService,
			chartService: chartService
		});
	}));

	it('should map UsageByMonth route', inject(function($route){
		var route = $route.routes['/UsageByMonth'];
		expect(route.controller).toBe('UsageByMonthController');
		expect(route.templateUrl).toBe('usagebymonth/usageByMonth.tpl.html');
	}));

	it('should update data with getUsageByMonth', function() {
		scope.selected.year = 1;
		scope.$digest();
		expect(scope.data).toEqual(usageData.data.usage);
		expect(dataService.getUsageByMonth).toHaveBeenCalledWith(scope.selected.year);
	});

	it('should update total with getUsageByMonth', function() {
		scope.selected.year = 1;
		scope.$digest();
		expect(scope.total).toEqual(usageData.data.total);
		expect(dataService.getUsageByMonth).toHaveBeenCalledWith(scope.selected.year);
	});

	it('should update chart data with getUsageByMonth', function() {
		scope.selected.year = 1;
		scope.$digest();
		expect(scope.chartData).toEqual(usageData.chartData);
		expect(dataService.getUsageByMonth).toHaveBeenCalledWith(scope.selected.year);
	});

	it('should update chart options with chart options from ChartService', function() {
		scope.selected.year = 1;
		scope.$digest();
		expect(scope.chartOptions).toEqual(chartOptions);
		expect(chartService.getChartOptions).toHaveBeenCalledWith(scope.chartData, chartService.getMonthLabel, chartService.getMonthLabel);
	});

	it('should change chart type in chart options', function() {
		scope.selected.chartType = 'test';
		scope.$digest();
		expect(scope.chartOptions.series[0].type).toEqual(scope.selected.chartType);
	});

	it('should have monthForm template', function() {
		var template = '<div><month-form></month-form></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
	});

	it('should have monthTable template', function() {
		var template = '<div><month-table></month-table></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
	});

	it('should have monthHeader template', function() {
		var template = '<div><month-header></month-header></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
	});

	it('should have monthBody template', function() {
		var template = '<div><month-body></month-body></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
	});

	it('should have monthFooter template', function() {
		var template = '<div><month-footer></month-footer></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
	});
});
