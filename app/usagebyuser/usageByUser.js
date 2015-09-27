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
.directive('userHeader', [function() {
	return {
		template: '<th><a href="" ng-click="predicate=\'IP\'; reverse=!reverse">IP</a></th>'+
			'<th><a href="" ng-click="predicate=\'MAC\'; reverse=!reverse">MAC</a></th>'+
			'<th><a href="" ng-click="predicate=\'user\'; reverse=!reverse">User</a></th>'+
			'<th class="text-right">Down</th>'+
			'<th class="text-right">Up</th>'+
			'<th class="text-right"><a href="" ng-click="predicate=\'total\'; reverse=!reverse">Total</a></th>'+
			'<th class="text-right">Percent</th>'+
			'<th class="text-right">Average</th>'+
			'<th class="text-right">Days</th>'+
			'<th>First Seen</th>'+
			'<th>Last Seen</th>'
	};
}])
.directive('userBody', [function() {
	return {
		template: '<td>{{current.IP}}</td>'+
			'<td>{{current.MAC}}</td>'+
			'<td>{{current.user}}</td>'+
			'<td class="text-right">{{current.download | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{current.upload | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{current.total | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{(current.total * 100 / total.total) | number:1}}%</td>'+
			'<td class="text-right">{{current.average | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{current.days}}</td>'+
			'<td>{{current.firstSeen | timeToDate | date: \'medium\'}}</td>'+
			'<td>{{current.lastSeen | timeToDate | date: \'medium\'}}</td>'
	};
}])
.directive('userFooter', [function() {
	return {
		template: '<th colspan="3">{{selected.month}} {{selected.year}} Totals</th>'+
			'<th class="text-right">{{total.download | usageInGBytes | number:3}}</th>'+
			'<th class="text-right">{{total.upload | usageInGBytes | number:3}}</th>'+
			'<th class="text-right">{{total.total | usageInGBytes | number:3}}</th>'+
			'<th></th>'+
			'<th class="text-right">{{total.average | usageInGBytes | number:3}}</th>'+
			'<th class="text-right">{{total.days}}</th>'+
			'<th></th>'+
			'<th></th>'
	};
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
