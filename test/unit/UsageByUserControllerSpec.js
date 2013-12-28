describe('UsageByUserController tests', function() {
	'use strict';

	var $scope = null,
		page = {},
		years = [10, 5, 6],
		year = years[0],
		months = ['Jan', 'Mar', 'Jun'],
		month = months[0],
		data = {
			usage: {
				1:	{
					IP: 'IP-address',
					user: 'user-name',
				}
			},
			total: 10
		},
		chartData = data.usage,
		mockBWMonService = {
			getYears: function() {
				return years;
			},
			getMonths: function(year) {
				return months;
			},
			getUsageByUser: function(year, month) {
				return {
					data: data,
					chartData: chartData
				};
			}
		},
		mockPagingService = {
			getPaging: function() {
				return page;
			}
		};

	beforeEach(module('BWMonApp.controllers'));
	beforeEach(inject(function($rootScope, $controller){
		$scope = $rootScope.$new();

		$controller('UsageByUserController', {
			$scope: $scope,
			BWMonService: mockBWMonService,
			PagingService: mockPagingService
		});
	}));

	it('should update years with getYears', inject(function() {
		var expected = years,
			actual = $scope.years;

		expect(expected).toEqual(actual);
	}));

	it('should update year with getYears first element', inject(function() {
		var expected = year,
			actual = $scope.selected.year;

		expect(expected).toEqual(actual);
	}));

	it('should update months with getMonths', inject(function() {
		var expected = months,
			actual = $scope.months;

		expect(expected).toEqual(actual);
	}));

	it('should update month with getMonths first element', inject(function() {
		var expected = month,
			actual = $scope.selected.month;

		expect(expected).toEqual(actual);
	}));

	it('should update data with getUsageByUser', inject(function() {
		var expected = data.usage,
			actual = $scope.data;

		expect(expected).toEqual(actual);
	}));

	it('should update total with getUsageByUser', inject(function() {
		var expected = data.total,
			actual = $scope.total;

		expect(expected).toEqual(actual);
	}));

	it('should update chart data with getUsageByUser', inject(function() {
		var expected = chartData,
			actual = $scope.chartData;

		expect(expected).toEqual(actual);
	}));

	it('should update graph options - series with getUsageByYear', inject(function() {
		var expected = {series: $scope.chartSeries},
			actual = $scope.chartOptions;

		expect(expected.series).toEqual(actual.series);
	}));

	it('should update graph options with non empty label - x axes', inject(function() {
		var expected = 'IP-address',
			actual = $scope.chartOptions.axes.x.labelFunction(1);

		expect(expected).toEqual(actual);
	}));

	it('should update graph options with empty label - x axes', inject(function() {
		var expected = '',
			actual = $scope.chartOptions.axes.x.labelFunction(1.1);

		expect(expected).toEqual(actual);
	}));

	it('should update graph options with non empty tootltip - x axes', inject(function() {
		var expected = 'user-name',
			actual = $scope.chartOptions.axes.x.tooltipFormatter(1);

		expect(expected).toEqual(actual);
	}));

	it('should update graph options with empty tootltip - x axes', inject(function() {
		var expected = '',
			actual = $scope.chartOptions.axes.x.tooltipFormatter(1.1);

		expect(expected).toEqual(actual);
	}));

	it('should update page with page from PageService', inject(function() {
		var expected = page,
			actual = $scope.page;

		expect(expected).toEqual(actual);
	}));
});
