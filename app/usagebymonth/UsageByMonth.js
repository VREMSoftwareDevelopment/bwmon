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
angular.module('BWMonApp.UsageByMonth', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	'use strict';
	$routeProvider.when('/UsageByMonth', {
		templateUrl: 'usagebymonth/UsageByMonth.tpl.html',
		controller: 'UsageByMonthController'
	});
}])
.controller('UsageByMonthController', ['$scope', 'BWMonService', function($scope, BWMonService) {
	'use strict';

	var getLabel = function(value) {
			var result = '';
			if (value % 1 === 0 && value >= 0 && value <= 11) {
				result = moment({month: value}).format("MMMM");
			}
			return result;
		},
		init = function() {
			var usageData;

			$scope.years = BWMonService.getYears();
			$scope.year = $scope.years[0];

			usageData = BWMonService.getUsageByMonth($scope.year);
			$scope.data = usageData.data.usage;
			$scope.total = usageData.data.total;
			$scope.chartData = usageData.chartData;
			$scope.predicate = 'id';
			$scope.reverse = true;
		};

	init();

	$scope.chartOptions = {
		series: $scope.chartSeries,
		axes: {
			x: {
				labelFunction: function(value) {
					return getLabel(value);
				},
				tooltipFormatter: function(value) {
					return getLabel(value);
				}
			}
		}
	};

	$scope.$watch('year', function() {
		var usageData = BWMonService.getUsageByMonth($scope.year);
		$scope.data = usageData.data.usage;
		$scope.total = usageData.data.total;
		$scope.chartData = usageData.chartData;
	}, true);
}]);
