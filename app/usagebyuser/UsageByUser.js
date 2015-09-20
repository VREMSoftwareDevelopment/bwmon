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
		templateUrl: 'usagebyuser/UsageByUser.tpl.html',
		controller: 'UsageByUserController'
	});
}])
.controller('UsageByUserController', ['$scope', 'BWMonService', 'PagingService', function($scope, BWMonService, PagingService) {
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
		getMonths = function(year) {
			$scope.months = BWMonService.getMonths(year);
			$scope.selected.month = $scope.months[0];
			$scope.selected.search = '';
		},
		getUsage = function(year, month, filter) {
			var usageData = BWMonService.getUsageByUser(year, month, filter);
			$scope.data = usageData.data.usage;
			$scope.total = usageData.data.total;
			$scope.chartData = usageData.chartData;
		},
		init = function() {
			$scope.years = BWMonService.getYears();
			$scope.selected = {};
			$scope.selected.year = $scope.years[0];
			$scope.predicate = 'IP';
			$scope.reverse = false;

			getMonths($scope.selected.year);
			getUsage($scope.selected);
		};

	init();

	$scope.page = PagingService.getPaging();

	$scope.$watch('selected.year', function() {
		getMonths($scope.selected.year);
	}, true);

	$scope.$watch('selected.month', function() {
		$scope.selected.search = '';
	}, true);

	$scope.$watch('selected', function() {
		getUsage($scope.selected.year, $scope.selected.month, $scope.selected.filter);
	}, true);

	$scope.chartOptions = {
		series: $scope.chartSeries,
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
}]);
