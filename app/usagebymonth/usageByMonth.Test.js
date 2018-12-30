describe('BWMonApp.UsageByMonth module, ', function() {
	var scope;

	beforeEach(module('BWMonApp.UsageByMonth'));
	beforeEach(module('BWMonApp.DataService'));
	beforeEach(module('BWMonApp.ChartService'));

	beforeEach(inject(function($rootScope){
		scope = $rootScope.$new();
	}));

	describe('config ', function() {
		it('should map UsageByMonth route', inject(function($route){
			var route = $route.routes['/UsageByMonth'];
			expect(route.controller).toBe('UsageByMonthController');
			expect(route.controllerAs).toBe('usageByMonthCtrl');
			expect(route.templateUrl).toBe('usagebymonth/usageByMonth.tpl.html');
		}));
	});

	describe('UsageByMonthController controller ', function() {
		var	controller,
			usageData = {
				data: [
					{usage: 5, total: 10},
					{usage: 2, total: 11},
					{usage: 1, total: 12}
				]
			},
			chartOptions = {
				series: [{
					type: 'type'
				}]
			},
			chartData = {
				dataset: [
					{x: 1, y: 0},
					{x: 2, y: 1},
					{x: 3, y: 2}
				]
			},
			chartService,
			dataService;

		beforeEach(inject(function(_$controller_, _dataService_, _chartService_){
			dataService = _dataService_;
			spyOn(dataService, 'getUsageByMonth').and.returnValue(usageData);

			chartService = _chartService_;
			spyOn(chartService, 'getChartOptions').and.returnValue(chartOptions);
			spyOn(chartService, 'getChartData').and.returnValue(chartData);

			controller = _$controller_('UsageByMonthController', {
				$scope: scope,
				dataService: dataService,
				chartService: chartService
			});

			scope.usageByMonthCtrl = controller;
		}));

		it('should set predicate to id', function() {
			expect(controller.predicate).toEqual('id');
		});

		it('should set descending to true', function() {
			expect(controller.descending).toEqual(true);
		});

		it('should setOrder set predicate', function() {
			var predicate = 'XYZ';
			controller.setOrder(predicate);
			expect(controller.predicate).toEqual('XYZ');
		});

		it('should setOrder change descending to false', function() {
			controller.setOrder(controller.predicate);
			expect(controller.descending).toEqual(false);
		});

		it('should getOrder return descending', function() {
			expect(controller.getOrder(controller.predicate)).toEqual({desc:true});
		});

		it('should getOrder return ascending', function() {
			controller.descending = false;
			expect(controller.getOrder(controller.predicate)).toEqual({asc:true});
		});

		it('should getOrder return none', function() {
			expect(controller.getOrder('XYZ')).toEqual({});
		});

		it('should reset predicate', function() {
			controller.predicate = 'xyz';
			controller.selected.year = 1;
			scope.$digest();
			expect(controller.predicate).toEqual('id');
		});

		it('should reset descending', function() {
			controller.descending = false;
			controller.selected.year = 1;
			scope.$digest();
			expect(controller.descending).toEqual(true);
		});

		it('should update data with getUsageByMonth', function() {
			controller.selected.year = 1;
			scope.$digest();
			expect(controller.data).toEqual(usageData.data.usage);
			expect(dataService.getUsageByMonth).toHaveBeenCalledWith(controller.selected.year);
		});

		it('should update total with getUsageByMonth', function() {
			controller.selected.year = 1;
			scope.$digest();
			expect(controller.total).toEqual(usageData.data.total);
			expect(dataService.getUsageByMonth).toHaveBeenCalledWith(controller.selected.year);
		});

		it('should update chart data with getUsageByMonth', function() {
			controller.selected.year = 1;
			scope.$digest();
			expect(controller.chartData).toEqual(chartData);
			expect(dataService.getUsageByMonth).toHaveBeenCalledWith(controller.selected.year);
		});

		it('should update chart data with getUsageByMonth', function() {
			controller.selected.year = 1;
			scope.$digest();
			expect(dataService.getUsageByMonth).toHaveBeenCalledWith(controller.selected.year);
		});

		it('should update chart data with getChartData', function() {
			controller.selected.year = 1;
			scope.$digest();
			expect(controller.chartData).toEqual(chartData);
			expect(chartService.getChartData).toHaveBeenCalledWith(usageData.data.usage);
		});

		it('should update chart options with chart options from ChartService', function() {
			controller.selected.year = 1;
			scope.$digest();
			expect(controller.chartOptions).toEqual(chartOptions);
			expect(chartService.getChartOptions).toHaveBeenCalledWith(controller.getLabel, controller.getLabel);
		});

		it('should change chart type in chart options', function() {
			controller.selected.chartType = 'test';
			scope.$digest();
			expect(controller.chartOptions.series[0].type).toEqual(controller.selected.chartType);
		});

		it('should update predicate to default', function() {
			controller.selected.year = 1;
			scope.$digest();
			expect(controller.data).toEqual(usageData.data.usage);
			expect(dataService.getUsageByMonth).toHaveBeenCalledWith(controller.selected.year);
		});
		
		it('should return month from using valid month', function() {
			expect(controller.getLabel(0)).toEqual('January');
			expect(controller.getLabel(11)).toEqual('December');
		});

		it('should return empty label using invalid month', function() {
			expect(controller.getLabel(-1)).toEqual('');
			expect(controller.getLabel(12)).toEqual('');
		});

		
	});
});
