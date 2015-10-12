describe('BWMonApp UsageByMonth feature', function() {
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
		expect(element.html()).toContain('<select-year');
		expect(element.html()).toContain('</select-year>');
	});

	it('should have monthTable template', function() {
		var template = '<div><month-table></month-table></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.html()).toContain('<table');
		expect(element.html()).toContain('</table>');
	});

	it('should have monthHeader template', function() {
		var template = '<div><month-header></month-header></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.html()).toContain('<month-header>');
		expect(element.html()).toContain('</month-header>');
	});

	it('should have monthBody template', function() {
		var template = '<div><month-body></month-body></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.html()).toContain('<month-body class="ng-binding">');
		expect(element.html()).toContain('</month-body>');
	});

	it('should have monthFooter template', function() {
		var template = '<div><month-footer></month-footer></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.html()).toContain('<month-footer class="ng-binding">');
		expect(element.html()).toContain('</month-footer>');
	});

	it('should have monthChartForm template', function() {
		var template = '<div><month-chart-form></month-chart-form></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.html()).toContain('<select-year');
		expect(element.html()).toContain('</select-year>');
		expect(element.html()).toContain('<chart-type');
		expect(element.html()).toContain('</chart-type>');
	});

	it('should have monthChart template', function() {
		var template = '<div><month-chart></month-chart></div>',
			element = compile(template)(scope);
		scope.displayType = true;
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.html()).toEqual('<div><linechart id="chartData" data="chartData" options="chartOptions"></linechart></div>');
	});
});
