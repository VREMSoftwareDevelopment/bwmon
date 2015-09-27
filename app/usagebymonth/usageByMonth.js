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
		templateUrl: 'usagebymonth/usageByMonth.tpl.html',
		controller: 'UsageByMonthController'
	});
}])
.directive('monthHeader', [function() {
	return {
		template: '<th><a href="" ng-click="predicate=\'id\'; reverse=!reverse;">Month</a></th>'+
			'<th class="text-right">Down</th>'+
			'<th class="text-right">Up</th>'+
			'<th class="text-right"><a href="" ng-click="predicate=\'total\'; reverse=!reverse">Total</a></th>'+
			'<th class="text-right">Percent</th>'+
			'<th class="text-right">Average</th>'+
			'<th class="text-right">Days</th>'
	};
}])
.directive('monthBody', [function() {
	return {
		template: '<td>{{::current.id | toMonth}}</td>'+
			'<td class="text-right">{{::current.download | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{::current.upload | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{::current.total | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{(current.total * 100 / total.total) | number:1}}%</td>'+
			'<td class="text-right">{{::current.average | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{::current.days}}</td>'
	};
}])
.directive('monthFooter', [function() {
	return {
		template: '<th>{{year}} Totals</th>'+
			'<th class="text-right">{{::total.download | usageInGBytes | number:3}}</th>'+
			'<th class="text-right">{{::total.upload | usageInGBytes | number:3}}</th>'+
			'<th class="text-right">{{::total.total | usageInGBytes | number:3}}</th>'+
			'<th></th>'+
			'<th class="text-right">{{::total.average | usageInGBytes | number:3}}</th>'+
			'<th class="text-right">{{::total.days}}</th>'
	};
}])
.controller('UsageByMonthController', ['$scope', 'dataService', 'chartService', function($scope, dataService, chartService) {
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

			$scope.year = dataService.getYears()[0];
			usageData = dataService.getUsageByMonth($scope.year);
			$scope.data = usageData.data.usage;
			$scope.total = usageData.data.total;
			$scope.chartData = usageData.chartData;
			$scope.predicate = 'id';
			$scope.reverse = true;
		};

	init();

	$scope.chartType = chartService.getChartTypes()[0];
	$scope.chartOptions = {
		series: chartService.getChartSeries(),
		axes: {
			x: {
				labelFunction: function(value) {
					return getLabel(value, $scope.chartData);
				},
				tooltipFormatter: function(value) {
					return getLabel(value, $scope.chartData);
				}
			}
		}
	};
	$scope.chartOptions.series[0].type = $scope.chartType;

	$scope.$watch('year', function() {
		var usageData = dataService.getUsageByMonth($scope.year);
		$scope.data = usageData.data.usage;
		$scope.total = usageData.data.total;
		$scope.chartData = usageData.chartData;
	}, true);

	$scope.$watch('chartType', function() {
		$scope.chartOptions.series[0].type = $scope.chartType;
	}, true);

}]);
