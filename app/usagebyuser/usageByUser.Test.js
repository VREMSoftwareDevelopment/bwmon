describe('BWMonApp UsageByUser feature', function() {
	'use strict';

	var scope,
		page = {},
		years = [10, 5, 1],
		months = ['Jan', 'Mar', 'Jun'],
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

	beforeEach(inject(function(_$rootScope_, $controller, _dataService_, _pagingService_, _chartService_){
		scope = _$rootScope_.$new();

		dataService = _dataService_;
		spyOn(dataService, 'getYears').and.returnValue(years);
		spyOn(dataService, 'getMonths').and.returnValue(months);
		spyOn(dataService, 'getUsageByUser').and.returnValue({data: data, chartData: chartData});

		pagingService = _pagingService_;
		spyOn(pagingService, 'getPaging').and.returnValue(page);

		chartService = _chartService_;
		spyOn(chartService, 'getChartSeries').and.returnValue(chartSeries);
		spyOn(chartService, 'getChartTypes').and.returnValue(chartTypes);

		$controller('UsageByUserController', {
			$scope: scope,
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

	it('should default year be first element of dataService.getYears', function() {
		expect(scope.selected.year).toEqual(years[0]);
		expect(dataService.getYears).toHaveBeenCalled();
	});

	it('should default month be first element of dataService.getMonths', function() {
		expect(scope.selected.month).toEqual(months[0]);
		expect(dataService.getMonths).toHaveBeenCalledWith(years[0]);
	});

	it('should default data be from dataService.getUsageByUser', function() {
		expect(scope.data).toEqual(data.usage);
		expect(dataService.getUsageByUser).toHaveBeenCalled();
	});

	it('should update total with getUsageByUser', function() {
		expect(scope.total).toEqual(data.total);
	});

	it('should update chart data with getUsageByUser', function() {
		expect(scope.chartData).toEqual(chartData);
	});

	it('should update graph options with chart series from ChartService', function() {
		expect(scope.chartOptions.series).toEqual(chartSeries);
	});

	it('should update graph options series type with first chart type from ChartService', function() {
		expect(scope.chartOptions.series[0].type).toEqual(chartTypes[0]);
	});

	it('should update selected chart type with first chart type from ChartService', function() {
		expect(scope.selected.chartType).toEqual(chartTypes[0]);
	});

	it('should update graph options with non empty label - x axes', function() {
		expect(scope.chartOptions.axes.x.labelFunction(1)).toEqual('IP-address');
	});

	it('should update graph options with empty label - x axes', function() {
		expect(scope.chartOptions.axes.x.labelFunction(1.1)).toEqual('');
	});

	it('should update graph options with non empty tootltip - x axes', function() {
		expect(scope.chartOptions.axes.x.tooltipFormatter(1)).toEqual('user-name');
	});

	it('should update graph options with empty tootltip - x axes', function() {
		expect(scope.chartOptions.axes.x.tooltipFormatter(1.1)).toEqual('');
	});

	it('should update page with page from PageService', function() {
		expect(scope.page).toEqual(page);
	});
});
