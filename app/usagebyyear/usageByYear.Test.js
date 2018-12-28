describe('BWMonApp.UsageByYear module, ', function() {
	var scope;

	beforeEach(module('BWMonApp.UsageByYear'));
	beforeEach(module('BWMonApp.DataService'));
	beforeEach(module('BWMonApp.ChartService'));

	beforeEach(inject(function($rootScope){
		scope = $rootScope.$new();
	}));

	describe('config ', function() {
		it('should map UsageByYear route', inject(function($route){
			var route = $route.routes['/UsageByYear'];
			expect(route.controller).toBe('UsageByYearController');
			expect(route.controllerAs).toBe('usageByYearCtrl');
			expect(route.templateUrl).toBe('usagebyyear/usageByYear.tpl.html');
		}));
	});

	describe('UsageByYearController controller ', function() {
		var controller,
			data = [
				{id: 1},
				{id: 2},
				{id: 3}
			],
			chartOptions = {
				series: [{
					type: 'type'
				}]
			},
			chartData = {
				dataset: data
			},
			chartService,
			dataService;

		beforeEach(inject(function(_$controller_, _dataService_, _chartService_){
			dataService = _dataService_;
			spyOn(dataService, 'getUsageByYear').and.returnValue({data: data, chartData: data});

			chartService = _chartService_;
			spyOn(chartService, 'getChartOptions').and.returnValue(chartOptions);
			spyOn(chartService, 'getChartData').and.returnValue(chartData);

			controller = _$controller_('UsageByYearController', {
				$scope: scope,
				dataService: dataService,
				chartService: chartService
			});
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

		it('should update data with getUsageByYear', function() {
			expect(controller.data).toEqual(data);
			expect(dataService.getUsageByYear).toHaveBeenCalled();
		});

		it('should update chart data with getChartData', function() {
			expect(controller.chartData).toEqual(chartData);
			expect(chartService.getChartData).toHaveBeenCalledWith(data);
		});

		it('should update chart options with chart options from ChartService', function() {
			expect(controller.chartOptions).toEqual(chartOptions);
			expect(chartService.getChartOptions).toHaveBeenCalledWith(data, chartService.getYearLabel, chartService.getYearLabel);
		});

		it('should change chart type in chart options', function() {
			controller.selected.chartType = 'test';
			scope.$digest();
			expect(controller.chartOptions.series[0].type).toEqual(controller.selected.chartType);
		});
	});
});
