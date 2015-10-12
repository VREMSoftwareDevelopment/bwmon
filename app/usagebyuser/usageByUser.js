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
.config(function($routeProvider) {
	$routeProvider.when('/UsageByUser', {
		templateUrl: 'usagebyuser/usageByUser.tpl.html',
		controller: 'UsageByUserController',
		controllerAs: 'usageByUserCtrl'
	});
})
.directive('userForm', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<form class="form-inline">',
					'<div class="form-group">',
						'<select-year ng-model="usageByUserCtrl.selected.year" class="form-control" name="year"/>',
					'</div>',
					'<div class="form-group">',
						'<select-month ng-model="usageByUserCtrl.selected.month" year="usageByUserCtrl.selected.year" class="form-control" name="month"/>',
					'</div>',
					'<div class="form-group">',
						'<input ng-model="usageByUserCtrl.selected.user" class="form-control" name="user" placeholder="IP, MAC or User"/>',
					'</div>',
					'<div class="form-group">',
						'<dir-pagination-controls max-size="5" boundary-links="true"></dir-pagination-controls>',
					'</div>',
				'</form>'
			].join('')
	};
})
.directive('userTable', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<div class="table-responsive">',
					'<table class="table table-striped table-hover table-condensed">',
						'<thead><tr user-header></tr></thead>',
						'<tbody><tr user-body dir-paginate="current in usageByUserCtrl.data | orderBy:predicate:usageByUserCtrl.reverse | itemsPerPage:usageByUserCtrl.pageSize"></tr></tbody>',
						'<tfoot><tr user-footer></tr></tfoot>',
					'</table>',
				'</div>'
			].join('')
	};
})
.directive('userHeader', function() {
	return {
		template: [
				'<th><a href="" ng-click="predicate=\'IP\'; usageByUserCtrl.reverse=!usageByUserCtrl.reverse">IP</a></th>',
				'<th><a href="" ng-click="predicate=\'MAC\'; usageByUserCtrl.reverse=!usageByUserCtrl.reverse">MAC</a></th>',
				'<th><a href="" ng-click="predicate=\'user\'; usageByUserCtrl.reverse=!usageByUserCtrl.reverse">User</a></th>',
				'<th class="text-right">Down</th>',
				'<th class="text-right">Up</th>',
				'<th class="text-right"><a href="" ng-click="predicate=\'total\'; usageByUserCtrl.reverse=!usageByUserCtrl.reverse">Total</a></th>',
				'<th class="text-right">Percent</th>',
				'<th class="text-right">Average</th>',
				'<th class="text-right">Days</th>',
				'<th>First Seen</th>',
				'<th>Last Seen</th>'
			].join('')
	};
})
.directive('userBody', function() {
	return {
		template: [
				'<td>{{::current.IP}}</td>',
				'<td>{{::current.MAC}}</td>',
				'<td>{{::current.user}}</td>',
				'<td class="text-right">{{::current.download | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.upload | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.total | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.percent | number:1}}%</td>',
				'<td class="text-right">{{::current.average | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.days}}</td>',
				'<td>{{::current.firstSeen | timeToDate | date: \'medium\'}}</td>',
				'<td>{{::current.lastSeen | timeToDate | date: \'medium\'}}</td>'
			].join('')
	};
})
.directive('userFooter', function() {
	return {
		template: [
				'<th colspan="3">{{::usageByUserCtrl.selected.month}} {{::usageByUserCtrl.selected.year}} Totals</th>',
				'<th class="text-right">{{::usageByUserCtrl.total.download | usageInGBytes | number:3}}</th>',
				'<th class="text-right">{{::usageByUserCtrl.total.upload | usageInGBytes | number:3}}</th>',
				'<th class="text-right">{{::usageByUserCtrl.total.total | usageInGBytes | number:3}}</th>',
				'<th></th>',
				'<th class="text-right">{{::usageByUserCtrl.total.average | usageInGBytes | number:3}}</th>',
				'<th class="text-right">{{::usageByUserCtrl.total.days}}</th>',
				'<th></th>',
				'<th></th>'
			].join('')
	};
})
.directive('userChartForm', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<form class="form-inline">',
					'<div class="form-group">',
						'<select-year ng-model="usageByUserCtrl.selected.year" class="form-control" name="year"/>',
					'</div>',
					'<div class="form-group">',
						'<select-month ng-model="usageByUserCtrl.selected.month" year="usageByUserCtrl.selected.year" class="form-control" name="month"/>',
					'</div>',
					'<div class="form-group">',
						'<input ng-model="usageByUserCtrl.selected.user" class="form-control" name="user" placeholder="IP, MAC or User"/>',
					'</div>',
					'<div class="form-group">',
						'<chart-type ng-model="usageByUserCtrl.selected.chartType" class="form-control" name="chartType"/>',
					'</div>',
				'</form>'
			].join('')
	};
})
.directive('userChart', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<div>',
					'<linechart id="chartData" data="usageByUserCtrl.chartData" options="usageByUserCtrl.chartOptions"></linechart>',
				'</div>'
			].join('')
	};
})
.controller('UsageByUserController', function($scope, dataService, chartService) {
	var usageByUserCtrl = this,
		reset = function() {
			usageByUserCtrl.selected.user = '';
		};

	usageByUserCtrl.selected = {};
	usageByUserCtrl.predicate = 'IP';
	usageByUserCtrl.reverse = false;
	usageByUserCtrl.pageSize = 12;

	$scope.$watch('usageByUserCtrl.selected.year', function() {
		reset();
		usageByUserCtrl.selected.month = dataService.getMonths(usageByUserCtrl.selected.year)[0];
	}, true);

	$scope.$watch('usageByUserCtrl.selected.month', function() {
		reset();
	}, true);

	$scope.$watch('usageByUserCtrl.selected', function() {
		var usageData = dataService.getUsageByUser(usageByUserCtrl.selected.year, usageByUserCtrl.selected.month, usageByUserCtrl.selected.user);
		usageByUserCtrl.data = usageData.data.usage;
		usageByUserCtrl.total = usageData.data.total;
		usageByUserCtrl.chartData = usageData.chartData;
		usageByUserCtrl.chartOptions = chartService.getChartOptions(usageByUserCtrl.chartData, chartService.getUserLabel, chartService.getUserTooltip);
	}, true);

	$scope.$watch('usageByUserCtrl.selected.chartType', function() {
		usageByUserCtrl.chartOptions.series[0].type = usageByUserCtrl.selected.chartType;
	}, true);
});
