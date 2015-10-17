describe('BWMonApp.UsageByUser module, ', function() {
	var scope;

	beforeEach(module('BWMonApp.UsageByUser'));
	beforeEach(module('BWMonApp.DataService'));
	beforeEach(module('BWMonApp.ChartService'));

	beforeEach(inject(function($rootScope){
		scope = $rootScope.$new();
	}));

	describe('config ', function() {
		it('should map UsageByUser route', inject(function($route){
			var route = $route.routes['/UsageByUser'];
			expect(route.controller).toBe('UsageByUserController');
			expect(route.controllerAs).toBe('usageByUserCtrl');
			expect(route.templateUrl).toBe('usagebyuser/usageByUser.tpl.html');
		}));
	});

	describe('UsageByUserController controller ', function() {
		var	controller,
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

		beforeEach(inject(function($controller, _dataService_, _chartService_){
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
	});

});
