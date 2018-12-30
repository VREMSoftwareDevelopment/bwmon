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
			usageByUser = {
				data: {
					usage: [
						{id: 3, IP: 'IP3', MAC: 'MAC3', user: 'user3', total: 30},
						{id: 5, IP: 'IP5', MAC: 'MAC5', user: 'user5', total: 50},
						{id: 2, IP: 'IP2', MAC: 'MAC2', user: 'user2', total: 20},
						{id: 4, IP: 'IP4', MAC: 'MAC4', user: 'user4', total: 40},
						{id: 1, IP: 'IP1', MAC: 'MAC1', user: 'user1', total: 10}
					],
					total: 10
				}
			},
			chartData = {
				dataset: [
					{x: 1, y: 0},
					{x: 2, y: 1},
					{x: 3, y: 2}
				]
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
			spyOn(dataService, 'getUsageByUser').and.returnValue(usageByUser);

			chartService = _chartService_;
			spyOn(chartService, 'getChartData').and.returnValue(chartData);
			spyOn(chartService, 'getChartOptions').and.returnValue(chartOptions);

			controller = $controller('UsageByUserController', {
				$scope: scope,
				dataService: dataService,
				chartService: chartService
			});

			scope.usageByUserCtrl = controller;
		}));

		it('should set predicate to id', function() {
			expect(controller.predicate).toEqual('IP');
		});

		it('should set descending to false', function() {
			expect(controller.descending).toEqual(false);
		});

		it('should setOrder set predicate', function() {
			var predicate = 'XYZ';
			controller.setOrder(predicate);
			expect(controller.predicate).toEqual('XYZ');
		});

		it('should setOrder change descending to true', function() {
			controller.setOrder(controller.predicate);
			expect(controller.descending).toEqual(true);
		});

		it('should getOrder return ascending', function() {
			expect(controller.getOrder(controller.predicate)).toEqual({asc:true});
		});

		it('should getOrder return descending', function() {
			controller.descending = true;
			expect(controller.getOrder(controller.predicate)).toEqual({desc:true});
		});

		it('should getOrder return none', function() {
			expect(controller.getOrder('XYZ')).toEqual({});
		});

		it('should set selected user to empty', function() {
			expect(controller.selected.user).toBe('');
		});

		it('should set page size', function() {
			expect(controller.pageSize).toEqual(15);
		});

		it('should reset predicate', function() {
			controller.predicate = 'xyz';
			scope.$digest();
			expect(controller.predicate).toEqual('IP');
		});

		it('should reset descending', function() {
			controller.descending = true;
			scope.$digest();
			expect(controller.descending).toEqual(false);
		});

		it('should reset selected user', function() {
			controller.selected.user = 'xyz';
			scope.$digest();
			expect(controller.selected.user).toBe('');
		});

		it('should get new user usage data when any attribute in selected object changes', function() {
			controller.selected.myTest = 'myTest';
			scope.$digest();
			expect(dataService.getUsageByUser).toHaveBeenCalledWith(controller.selected.year, controller.selected.month, controller.selected.user);
			expect(controller.data).toEqual(usageByUser.data.usage);
			expect(controller.total).toEqual(usageByUser.data.total);
		});

		it('should update chart data with getChartData', function() {
			controller.selected.year = 1;
			scope.$digest();
			expect(controller.chartData).toEqual(chartData);
			expect(chartService.getChartData).toHaveBeenCalledWith(usageByUser.data.usage);
		});

		it('should update chart options with chart options from ChartService', function() {
			controller.selected.year = 1;
			scope.$digest();
			expect(controller.chartOptions).toEqual(chartOptions);
			expect(chartService.getChartOptions).toHaveBeenCalledWith(controller.getLabel, controller.getTooltip);
		});

		it('should change chart type in chart options', function() {
			controller.selected.chartType = 'test';
			scope.$digest();
			expect(controller.chartOptions.series[0].type).toEqual(controller.selected.chartType);
		});
		
		it('should return empty user label', function() {
			controller.data = usageByUser.data.usage; 
			expect(controller.getLabel(4)).toEqual('IP4');
		});

		it('should return user tooltip label from data using valid user', function() {
			controller.data = usageByUser.data.usage; 
			expect(controller.getTooltip(2)).toEqual('IP2 | MAC2 | user2');
		});

		it('should return empty tooltip from data using invalid user', function() {
			expect(controller.getTooltip(0)).toEqual('');
		});
	});

});
