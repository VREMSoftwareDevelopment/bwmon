describe('BWMonApp UsageByUser feature', function() {
	var scope,
		compile,
		page = {
			reset: function() {}
		},
		months = ['Jan', 'Mar', 'Jun'],
		usageData = {
			data: {
				usage: {
					1:	{
						IP: 'IP-address',
						user: 'user-name',
					}
				},
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

	beforeEach(module('BWMonApp.ChartService'));
	beforeEach(module('BWMonApp.DataService'));
	beforeEach(module('BWMonApp.UsageByUser'));
	beforeEach(module('BWMonApp.Filters'));

	beforeEach(inject(function(_$compile_, _$rootScope_, $controller, _dataService_, _chartService_){
		compile = _$compile_;
		scope = _$rootScope_.$new();

		dataService = _dataService_;
		spyOn(dataService, 'getMonths').and.returnValue(months);
		spyOn(dataService, 'getUsageByUser').and.returnValue(usageData);

		chartService = _chartService_;
		spyOn(chartService, 'getChartOptions').and.returnValue(chartOptions);

		$controller('UsageByUserController', {
			$scope: scope,
			dataService: dataService,
			chartService: chartService
		});
	}));

	it('should map UsageByUser route', inject(function($route){
		var route = $route.routes['/UsageByUser'];
		expect(route.controller).toBe('UsageByUserController');
		expect(route.templateUrl).toBe('usagebyuser/usageByUser.tpl.html');
	}));

	it('should reset selected user and get new default month when selected year changes', function() {
		scope.selected.year = 'year';
		expect(scope.selected.user).toBeUndefined();
		scope.$digest();
		expect(scope.selected.user).toBe('');
		expect(dataService.getMonths).toHaveBeenCalledWith(scope.selected.year);
	});

	it('should reset selected user when selected month changes', function() {
		scope.selected.month = 'month';
		expect(scope.selected.user).toBeUndefined();
		scope.$digest();
		expect(scope.selected.user).toBe('');
	});

	it('should get new usage data when any attribute in selected object changes', function() {
		scope.selected.myTest = 'myTest';
		scope.$digest();
		expect(dataService.getUsageByUser).toHaveBeenCalledWith(scope.selected.year, scope.selected.month, scope.selected.user);
		expect(scope.data).toEqual(usageData.data.usage);
		expect(scope.total).toEqual(usageData.data.total);
		expect(scope.chartData).toEqual(usageData.chartData);
		expect(chartService.getChartOptions).toHaveBeenCalledWith(scope.chartData, chartService.getUserLabel, chartService.getUserTooltip);
	});

	it('should change chart type in chart options', function() {
		scope.selected.chartType = 'test';
		scope.$digest();
		expect(scope.chartOptions.series[0].type).toEqual(scope.selected.chartType);
	});

	it('should have userForm template', function() {
		var template = '<div><user-form></user-form></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.html()).toContain('<select-year');
		expect(element.html()).toContain('</select-year>');
		expect(element.html()).toContain('<select-month');
		expect(element.html()).toContain('</select-month>');
		expect(element.html()).toContain('<dir-pagination-controls');
		expect(element.html()).toContain('</dir-pagination-controls>');
	});

	it('should have userHeader template', function() {
		var template = '<div><user-header></user-header></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.html()).toContain('<user-header>');
		expect(element.html()).toContain('</user-header>');
	});

	it('should have userBody template', function() {
		var template = '<div><user-body></user-body></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.html()).toContain('<user-body class="ng-binding">');
		expect(element.html()).toContain('</user-body>');
	});

	it('should have userFooter template', function() {
		var template = '<div><user-footer></user-footer></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.html()).toContain('<user-footer class="ng-binding">');
		expect(element.html()).toContain('</user-footer>');
	});

	it('should have userChartForm template', function() {
		var template = '<div><user-chart-form></user-chart-form></div>',
			element = compile(template)(scope);
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.html()).toContain('<select-year');
		expect(element.html()).toContain('</select-year>');
		expect(element.html()).toContain('<select-month');
		expect(element.html()).toContain('</select-month>');
		expect(element.html()).toContain('<chart-type');
		expect(element.html()).toContain('</chart-type>');
	});

	it('should have userChart template', function() {
		var template = '<div><user-chart></user-chart></div>',
			element = compile(template)(scope);
		scope.displayType = true;
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.html()).toEqual('<div><linechart id="chartData" data="chartData" options="chartOptions"></linechart></div>');
	});
});
