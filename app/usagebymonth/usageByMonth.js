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
.config(function($routeProvider) {
	$routeProvider.when('/UsageByMonth', {
		templateUrl: 'usagebymonth/usageByMonth.tpl.html',
		controller: 'UsageByMonthController',
		controllerAs: 'usageByMonthCtrl'
	});
})
.directive('monthForm', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<form class="form-inline">',
					'<div class="form-group">',
						'<select-year ng-model="usageByMonthCtrl.selected.year" class="form-control" name="year"/>',
					'</div>',
				'</form>'
			].join('')
	};
})
.directive('monthTable', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<div class="table-responsive">',
					'<table class="table table-striped table-hover table-condensed">',
						'<thead><tr month-header></tr></thead>',
						'<tbody><tr month-body ng-repeat="current in usageByMonthCtrl.data | orderBy:predicate:usageByMonthCtrl.reverse"></tr></tbody>',
						'<tfoot><tr month-footer></tr></tfoot>',
					'</table>',
				'</div>'
			].join('')
	};
})
.directive('monthHeader', function() {
	return {
		template: [
				'<th><a href="" ng-click="predicate=\'id\'; usageByMonthCtrl.reverse=!usageByMonthCtrl.reverse;">Month</a></th>',
				'<th class="text-right">Down</th>',
				'<th class="text-right">Up</th>',
				'<th class="text-right"><a href="" ng-click="predicate=\'total\'; usageByMonthCtrl.reverse=!usageByMonthCtrl.reverse">Total</a></th>',
				'<th class="text-right">Percent</th>',
				'<th class="text-right">Average</th>',
				'<th class="text-right">Days</th>'
			].join('')
	};
})
.directive('monthBody', function() {
	return {
		template: [
				'<td>{{::current.id | toMonth}}</td>',
				'<td class="text-right">{{::current.download | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.upload | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.total | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.percent | number:1}}%</td>',
				'<td class="text-right">{{::current.average | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.days}}</td>'
			].join('')
	};
})
.directive('monthFooter', function() {
	return {
		template: [
				'<th>{{usageByMonthCtrl.selected.year}} Totals</th>',
				'<th class="text-right">{{::usageByMonthCtrl.total.download | usageInGBytes | number:3}}</th>',
				'<th class="text-right">{{::usageByMonthCtrl.total.upload | usageInGBytes | number:3}}</th>',
				'<th class="text-right">{{::usageByMonthCtrl.total.total | usageInGBytes | number:3}}</th>',
				'<th></th>',
				'<th class="text-right">{{::usageByMonthCtrl.total.average | usageInGBytes | number:3}}</th>',
				'<th class="text-right">{{::usageByMonthCtrl.total.days}}</th>'
			].join('')
	};
})
.directive('monthChartForm', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<form class="form-inline">',
					'<div class="form-group">',
						'<select-year ng-model="usageByMonthCtrl.selected.year" class="form-control" name="year"/>',
					'</div>',
					'<div class="form-group">',
						'<chart-type ng-model="usageByMonthCtrl.selected.chartType" class="form-control" name="chartType"/>',
					'</div>',
				'</form>'
			].join('')
	};
})
.directive('monthChart', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<div>',
					'<linechart id="chartData" data="usageByMonthCtrl.chartData" options="usageByMonthCtrl.chartOptions"></linechart>',
				'</div>'
			].join('')
	};
})
.controller('UsageByMonthController', function($scope, dataService, chartService) {
	var usageByMonthCtrl = this;

	usageByMonthCtrl.selected = {};
	usageByMonthCtrl.predicate = 'id';
	usageByMonthCtrl.reverse = false;

	$scope.$watch('usageByMonthCtrl.selected.year', function() {
		var usageData = dataService.getUsageByMonth(usageByMonthCtrl.selected.year);

		usageByMonthCtrl.data = usageData.data.usage;
		usageByMonthCtrl.total = usageData.data.total;
		usageByMonthCtrl.chartData = usageData.chartData;
		usageByMonthCtrl.chartOptions = chartService.getChartOptions(usageByMonthCtrl.chartData, chartService.getMonthLabel, chartService.getMonthLabel);
	}, true);

	$scope.$watch('usageByMonthCtrl.selected.chartType', function() {
		usageByMonthCtrl.chartOptions.series[0].type = usageByMonthCtrl.selected.chartType;
	}, true);

});
