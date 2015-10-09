describe('BWMonApp UsageByYear feature', function() {
	var scope,
		compile,
		chartOptions = {
			series: [{
				type: 'type'
			}]
		},
		chartService,
		data = {id: 11},
		dataService;

	beforeEach(module('BWMonApp.DataService'));
	beforeEach(module('BWMonApp.ChartService'));
	beforeEach(module('BWMonApp.UsageByYear'));
	beforeEach(module('BWMonApp.Filters'));

	beforeEach(inject(function(_$compile_, $rootScope, _$controller_, _dataService_, _chartService_){
		compile = _$compile_;
		scope = $rootScope.$new();

		dataService = _dataService_;
		spyOn(dataService, 'getUsageByYear').and.returnValue({data: data, chartData: {1: data}});

		chartService = _chartService_;
		spyOn(chartService, 'getChartOptions').and.returnValue(chartOptions);

		_$controller_('UsageByYearController', {
			$scope: scope,
			dataService: dataService,
			chartService: chartService
		});
	}));

	it('should map UsageByYear route', inject(function($route){
		var route = $route.routes['/UsageByYear'];
		expect(route.controller).toBe('UsageByYearController');
		expect(route.templateUrl).toBe('usagebyyear/usageByYear.tpl.html');
	}));

	it('should update data with getUsageByYear', function() {
		expect(scope.data).toEqual(data);
		expect(dataService.getUsageByYear).toHaveBeenCalled();
	});

	it('should update chart data with getUsageByYear', function() {
		expect(scope.chartData).toEqual({1:data});
	});

	it('should update chart options with chart options from ChartService', function() {
		expect(scope.chartOptions).toEqual(chartOptions);
		expect(chartService.getChartOptions).toHaveBeenCalledWith(scope.chartData, chartService.getYearLabel, chartService.getYearLabel);
	});

	it('should change chart type in chart options', function() {
		scope.selected.chartType = 'test';
		scope.$digest();
		expect(scope.chartOptions.series[0].type).toEqual(scope.selected.chartType);
	});

	it('should have yearForm template', function() {
		var template = '<div><year-form></year-form></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
	});

	it('should have yearTable template', function() {
		var template = '<div><year-table></year-table></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
	});

	it('should have yearHeader template', function() {
		var template = '<div><year-header></year-header></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
	});

	it('should have yearBody template', function() {
		var template = '<div><year-body></year-body></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
	});
});
