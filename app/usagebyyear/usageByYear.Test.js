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
			chartOptions = {
					series: [{
						type: 'type'
					}]
			},
			data = {id: 11},
			chartService,
			dataService;

		beforeEach(inject(function(_$controller_, _dataService_, _chartService_){
			dataService = _dataService_;
			spyOn(dataService, 'getUsageByYear').and.returnValue({data: data, chartData: {1: data}});

			chartService = _chartService_;
			spyOn(chartService, 'getChartOptions').and.returnValue(chartOptions);

			controller = _$controller_('UsageByYearController', {
				$scope: scope,
				dataService: dataService,
				chartService: chartService
			});
		}));

		it('should update data with getUsageByYear', function() {
			expect(controller.data).toEqual(data);
			expect(dataService.getUsageByYear).toHaveBeenCalled();
		});

		it('should update chart data with getUsageByYear', function() {
			expect(controller.chartData).toEqual({1:data});
		});

		it('should update chart options with chart options from ChartService', function() {
			expect(controller.chartOptions).toEqual(chartOptions);
			expect(chartService.getChartOptions).toHaveBeenCalledWith(controller.chartData, chartService.getYearLabel, chartService.getYearLabel);
		});

		it('should change chart type in chart options', function() {
			controller.selected.chartType = 'test';
			scope.$digest();
			expect(controller.chartOptions.series[0].type).toEqual(controller.selected.chartType);
		});
	});
});
