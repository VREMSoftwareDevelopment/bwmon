describe('BWMonApp UsageByUser feature', function() {
	var scope,
		compile,
		controller,
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

		controller = $controller('UsageByUserController', {
			$scope: scope,
			dataService: dataService,
			chartService: chartService
		});
	}));

	it('should map UsageByUser route', inject(function($route){
		var route = $route.routes['/UsageByUser'];
		expect(route.controller).toBe('UsageByUserController');
		expect(route.controllerAs).toBe('usageByUserCtrl');
		expect(route.templateUrl).toBe('usagebyuser/usageByUser.tpl.html');
	}));

	it('should reset selected user and get new default month when selected year changes', function() {
		controller.selected.year = 'year';
		expect(controller.selected.user).toBeUndefined();
		scope.$digest();
		expect(controller.selected.user).toBe('');
		expect(dataService.getMonths).toHaveBeenCalledWith(controller.selected.year);
	});

	it('should reset selected user when selected month changes', function() {
		controller.selected.month = 'month';
		expect(controller.selected.user).toBeUndefined();
		scope.$digest();
		expect(controller.selected.user).toBe('');
	});

	it('should get new usage data when any attribute in selected object changes', function() {
		controller.selected.myTest = 'myTest';
		scope.$digest();
		expect(dataService.getUsageByUser).toHaveBeenCalledWith(controller.selected.year, controller.selected.month, controller.selected.user);
		expect(controller.data).toEqual(usageData.data.usage);
		expect(controller.total).toEqual(usageData.data.total);
		expect(controller.chartData).toEqual(usageData.chartData);
		expect(chartService.getChartOptions).toHaveBeenCalledWith(controller.chartData, chartService.getUserLabel, chartService.getUserTooltip);
	});

	it('should change chart type in chart options', function() {
		controller.selected.chartType = 'test';
		scope.$digest();
		expect(controller.chartOptions.series[0].type).toEqual(controller.selected.chartType);
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
		expect(element.html()).toEqual('<div><linechart id="chartData" data="usageByUserCtrl.chartData" options="usageByUserCtrl.chartOptions"></linechart></div>');
	});
});
