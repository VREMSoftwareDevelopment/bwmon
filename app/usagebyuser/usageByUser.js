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
.directive('userForm', [function() {
	return {
		restrict: 'E',
		replace: true,
		template: '<form class="form-inline">'+
			'<display-type ng-model="displayType"/></display-type>'+
			'<div class="form-group">'+
				'<label class="sr-only" for="year">Year</label>'+
				'<select-year ng-model="selected.year" class="form-control" name="year"/>'+
			'</div>'+
			'<div class="form-group">'+
				'<label class="sr-only" for="month">Month</label>'+
				'<select-month ng-model="selected.month" year="selected.year" class="form-control" name="month"/>'+
			'</div>'+
			'<div class="form-group">'+
				'<label class="sr-only" for="user">Filter by IP, MAC or User</label>'+
				'<input ng-model="selected.user" class="form-control" name="user" placeholder="IP, MAC or User"/>'+
			'</div>'+
			'<div ng-if="displayType" class="form-group">'+
				'<label class="sr-only" for="chartType">Chart Type</label>'+
				'<chart-type ng-model="selected.chartType" class="form-control" name="chartType"/>'+
			'</div>'+
			'<div ng-if="!displayType" class="form-group">'+
				'<dir-pagination-controls max-size="5" boundary-links="true"></dir-pagination-controls>'+
			'</div>'+
			'</form>'
	};
}])
.directive('userTable', [function() {
	return {
		restrict: 'E',
		replace: true,
		template: '<div ng-if="!displayType" class="table-responsive">'+
			'<table class="table table-striped table-hover table-condensed">'+
			'<thead><tr user-header></tr></thead>'+
			'<tbody><tr user-body dir-paginate="current in data | orderBy:predicate: reverse | itemsPerPage: pageSize"></tr></tbody>'+
			'<tfoot><tr user-footer></tr></tfoot>'+
			'</table>'+
			'</div>'
	};
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
		template: '<td>{{::current.IP}}</td>'+
			'<td>{{::current.MAC}}</td>'+
			'<td>{{::current.user}}</td>'+
			'<td class="text-right">{{::current.download | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{::current.upload | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{::current.total | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{::current.percent | number:1}}%</td>'+
			'<td class="text-right">{{::current.average | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{::current.days}}</td>'+
			'<td>{{::current.firstSeen | timeToDate | date: \'medium\'}}</td>'+
			'<td>{{::current.lastSeen | timeToDate | date: \'medium\'}}</td>'
	};
}])
.directive('userFooter', [function() {
	return {
		template: '<th colspan="3">{{::selected.month}} {{::selected.year}} Totals</th>'+
			'<th class="text-right">{{::total.download | usageInGBytes | number:3}}</th>'+
			'<th class="text-right">{{::total.upload | usageInGBytes | number:3}}</th>'+
			'<th class="text-right">{{::total.total | usageInGBytes | number:3}}</th>'+
			'<th></th>'+
			'<th class="text-right">{{::total.average | usageInGBytes | number:3}}</th>'+
			'<th class="text-right">{{::total.days}}</th>'+
			'<th></th>'+
			'<th></th>'
	};
}])
.controller('UsageByUserController', ['$scope', 'dataService', 'chartService', function($scope, dataService, chartService) {
	'use strict';

	var reset = function() {
			$scope.selected.user = '';
		};

	$scope.selected = {};
	$scope.predicate = 'IP';
	$scope.reverse = false;
	$scope.pageSize = 12;

	$scope.$watch('selected.year', function() {
		reset();
		$scope.selected.month = dataService.getMonths($scope.selected.year)[0];
	}, true);

	$scope.$watch('selected.month', function() {
		reset();
	}, true);

	$scope.$watch('selected', function() {
		var usageData = dataService.getUsageByUser($scope.selected.year, $scope.selected.month, $scope.selected.user);
		$scope.data = usageData.data.usage;
		$scope.total = usageData.data.total;
		$scope.chartData = usageData.chartData;
		$scope.chartOptions = chartService.getChartOptions($scope.chartData, chartService.getUserLabel, chartService.getUserTooltip);
	}, true);

	$scope.$watch('selected.chartType', function() {
		$scope.chartOptions.series[0].type = $scope.selected.chartType;
	}, true);


}]);
