describe('UsageByMonthController tests', function() {
	'use strict';

	var $scope = null,
		years = [10, 5, 6],
		year = years[0],
		data = {
			usage: 5,
			total: 10
		},
		chartData = [],
		mockBWMonService;

    beforeEach(module('BWMonApp.services'));
	beforeEach(module('BWMonApp.controllers'));

	beforeEach(inject(function($rootScope, $controller, _BWMonService_){
        $scope = $rootScope.$new();
		$scope.chartSeries = [];
        spyOn($scope, '$watch');

        mockBWMonService = _BWMonService_;
        spyOn(mockBWMonService, 'getYears').and.returnValue(years);
        spyOn(mockBWMonService, 'getUsageByMonth').and.returnValue({data: data, chartData: chartData});

		$controller('UsageByMonthController', {
			$scope: $scope,
			BWMonService: mockBWMonService
		});

	}));

	it('should update years with getYears', inject(function() {
		var expected = years,
			actual = $scope.years;

		expect(expected).toEqual(actual);

	}));

	it('should update year with getYears first element', inject(function() {
		var expected = year,
			actual = $scope.year;

		expect(expected).toEqual(actual);
	}));

	it('should update data with getUsageByMonth', inject(function() {
		var expected = data.usage,
			actual = $scope.data;

		expect(expected).toEqual(actual);
	}));

	it('should update total with getUsageByMonth', inject(function() {
		var expected = data.total,
			actual = $scope.total;

		expect(expected).toEqual(actual);
	}));

	it('should update chart data with getUsageByMonth', inject(function() {
		var expected = [],
			actual = $scope.chartData;

		expect(expected).toEqual(actual);
	}));

	it('should update graph options - series with getUsageByMonth', inject(function() {
		var expected = {series: $scope.chartSeries},
			actual = $scope.chartOptions;

		expect(expected.series).toEqual(actual.series);
	}));

	it('should update graph options with non empty label - x axes', inject(function() {
		var expected = 'February',
			actual = $scope.chartOptions.axes.x.labelFunction(1);

		expect(expected).toEqual(actual);
	}));

	it('should update graph options with empty label - x axes', inject(function() {
		var expected = '',
			actual = $scope.chartOptions.axes.x.labelFunction(1.1);

		expect(expected).toEqual(actual);
	}));

	it('should update graph options with non empty tootltip - x axes', inject(function() {
		var expected = 'February',
			actual = $scope.chartOptions.axes.x.tooltipFormatter(1);

		expect(expected).toEqual(actual);
	}));

	it('should update graph options with empty tootltip - x axes', inject(function() {
		var expected = '',
			actual = $scope.chartOptions.axes.x.tooltipFormatter(1.1);

		expect(expected).toEqual(actual);
	}));

});
