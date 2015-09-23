describe('BWMonApp UsageByYear feature', function() {
	'use strict';

	var $scope = null,
		chartSeries = [{key:1}],
		chartTypes = ['x'],
		chartService,
		data = {id: 11},
		dataService;

	beforeEach(module('BWMonApp.DataService'));
	beforeEach(module('BWMonApp.ChartService'));
	beforeEach(module('BWMonApp.UsageByYear'));

	beforeEach(inject(function($rootScope, $controller, _dataService_, _chartService_){
		$scope = $rootScope.$new();

		$scope.chartSeries = [];

		dataService = _dataService_;
		spyOn(dataService, 'getUsageByYear').and.returnValue({data: data, chartData: {1: data}});

		chartService = _chartService_;
		spyOn(chartService, 'getChartSeries').and.returnValue(chartSeries);
		spyOn(chartService, 'getChartTypes').and.returnValue(chartTypes);

		$controller('UsageByYearController', {
			$scope: $scope,
			dataService: dataService,
			chartService: chartService
		});
	}));

	it('should map UsageByYear route', inject(function($route){
		var route = $route.routes['/UsageByYear'];
		expect(route.controller).toBe('UsageByYearController');
		expect(route.templateUrl).toBe('usagebyyear/usageByYear.tpl.html');
	}));

	it('should update data with getUsageByYear', inject(function() {
		expect($scope.data).toEqual(data);
	}));

	it('should update chart data with getUsageByYear', inject(function() {
		expect($scope.chartData).toEqual({1:data});
	}));

	it('should update graph options with chart series from ChartService', inject(function() {
		expect($scope.chartOptions.series).toEqual(chartSeries);
	}));

	it('should update graph options series type with first chart type from ChartService', inject(function() {
		expect($scope.chartOptions.series[0].type).toEqual(chartTypes[0]);
	}));

	it('should update chart type with first chart type from ChartService', inject(function() {
		expect($scope.chartType).toEqual(chartTypes[0]);
	}));

	it('should update graph options with non empty label - x axes', inject(function() {
		expect($scope.chartOptions.axes.x.labelFunction(1)).toEqual(11);
	}));

	it('should update graph options with empty label - x axes', inject(function() {
		expect($scope.chartOptions.axes.x.labelFunction(1.1)).toEqual('');
	}));

	it('should update graph options with non empty tootltip - x axes', inject(function() {
		expect($scope.chartOptions.axes.x.tooltipFormatter(1)).toEqual(11);
	}));

	it('should update graph options with empty tootltip - x axes', inject(function() {
		expect($scope.chartOptions.axes.x.tooltipFormatter(1.1)).toEqual('');
	}));

});
