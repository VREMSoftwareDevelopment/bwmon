/*
 *    Copyright (C) 2010 - 2015 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */
angular.module('BWMonApp.UsageByUser', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	'use strict';
	$routeProvider.when('/UsageByUser', {
		templateUrl: 'usagebyuser/usageByUser.tpl.html',
		controller: 'UsageByUserController'
	});
}])
.controller('UsageByUserController', ['$scope', 'dataService', 'pagingService', 'chartService', function($scope, dataService, pagingService, chartService) {
	'use strict';

	var getLabel = function(value, data) {
			var result = '';
			if (value % 1 === 0 && typeof data[value] !== 'undefined' && data[value] !== null) {
				result = data[value].IP;
			}
			return result;
		},
		getTooltip = function(value, data) {
			var result = '';
			if (value % 1 === 0 && typeof data[value] !== 'undefined' && data[value] !== null) {
				result = data[value].user;
			}
			return result;
		},
		getUsage = function(year, month, filter) {
			var usageData = dataService.getUsageByUser(year, month, filter);
			$scope.data = usageData.data.usage;
			$scope.total = usageData.data.total;
			$scope.chartData = usageData.chartData;
		},
		init = function() {
			$scope.selected = {};
			$scope.predicate = 'IP';
			$scope.reverse = false;

			$scope.selected.year = dataService.getYears()[0];
			$scope.selected.month = dataService.getMonths($scope.selected.year)[0];
			getUsage($scope.selected);
		};

	init();

	$scope.page = pagingService.getPaging();

	$scope.selected.chartType = chartService.getChartTypes()[0];
	$scope.chartOptions = {
		series: chartService.getChartSeries(),
		axes: {
			x: {
				labelFunction: function(value) {
					return getLabel(value, $scope.data);
				},
				tooltipFormatter: function(value) {
					return getTooltip(value, $scope.data);
				}
			}
		}
	};
	$scope.chartOptions.series[0].type = $scope.selected.chartType;

	$scope.$watch('selected.year', function() {
		$scope.selected.search = '';
	}, true);

	$scope.$watch('selected.month', function() {
		$scope.selected.search = '';
	}, true);

	$scope.$watch('selected.chartType', function() {
		$scope.chartOptions.series[0].type = $scope.selected.chartType;
	}, true);

	$scope.$watch('selected', function() {
		getUsage($scope.selected.year, $scope.selected.month, $scope.selected.filter);
	}, true);


}]);
