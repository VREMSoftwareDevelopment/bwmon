describe('BWMonApp UsageByUser feature', function() {
	'use strict';

	var $scope = null,
		page = {},
		months = ['Jan', 'Mar', 'Jun'],
		month = months[0],
		data = {
			usage: {
				1:	{
					IP: 'IP-address',
					user: 'user-name',
				}
			},
			total: 10
		},
		chartData = data.usage,
		chartSeries = [{key:1}],
		chartTypes = ['x'],
		chartService,
		dataService,
		pagingService;

	beforeEach(module('BWMonApp.ChartService'));
	beforeEach(module('BWMonApp.DataService'));
	beforeEach(module('BWMonApp.PagingService'));
	beforeEach(module('BWMonApp.UsageByUser'));

	beforeEach(inject(function($rootScope, $controller, _dataService_, _pagingService_, _chartService_){
		$scope = $rootScope.$new();

		dataService = _dataService_;
		spyOn(dataService, 'getMonths').and.returnValue(months);
		spyOn(dataService, 'getUsageByUser').and.returnValue({data: data, chartData: chartData});

		pagingService = _pagingService_;
		spyOn(pagingService, 'getPaging').and.returnValue(page);

		chartService = _chartService_;
		spyOn(chartService, 'getChartSeries').and.returnValue(chartSeries);
		spyOn(chartService, 'getChartTypes').and.returnValue(chartTypes);

		$controller('UsageByUserController', {
			$scope: $scope,
			dataService: dataService,
			pagingService: pagingService,
			chartService: chartService
		});
	}));

	it('should map UsageByUser route', inject(function($route){
		var route = $route.routes['/UsageByUser'];
		expect(route.controller).toBe('UsageByUserController');
		expect(route.templateUrl).toBe('usagebyuser/usageByUser.tpl.html');
	}));

	it('should update months with getMonths', inject(function() {
		expect($scope.months).toEqual(months);
	}));

	it('should update month with getMonths first element', inject(function() {
		expect($scope.selected.month).toEqual(month);
	}));

	it('should update data with getUsageByUser', inject(function() {
		expect($scope.data).toEqual(data.usage);
	}));

	it('should update total with getUsageByUser', inject(function() {
		expect($scope.total).toEqual(data.total);
	}));

	it('should update chart data with getUsageByUser', inject(function() {
		expect($scope.chartData).toEqual(chartData);
	}));

	it('should update graph options with chart series from ChartService', inject(function() {
		expect($scope.chartOptions.series).toEqual(chartSeries);
	}));

	it('should update graph options series type with first chart type from ChartService', inject(function() {
		expect($scope.chartOptions.series[0].type).toEqual(chartTypes[0]);
	}));

	it('should update selected chart type with first chart type from ChartService', inject(function() {
		expect($scope.selected.chartType).toEqual(chartTypes[0]);
	}));

	it('should update graph options with non empty label - x axes', inject(function() {
		expect($scope.chartOptions.axes.x.labelFunction(1)).toEqual('IP-address');
	}));

	it('should update graph options with empty label - x axes', inject(function() {
		expect($scope.chartOptions.axes.x.labelFunction(1.1)).toEqual('');
	}));

	it('should update graph options with non empty tootltip - x axes', inject(function() {
		expect($scope.chartOptions.axes.x.tooltipFormatter(1)).toEqual('user-name');
	}));

	it('should update graph options with empty tootltip - x axes', inject(function() {
		expect($scope.chartOptions.axes.x.tooltipFormatter(1.1)).toEqual('');
	}));

	it('should update page with page from PageService', inject(function() {
		expect($scope.page).toEqual(page);
	}));
});
