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
angular.module('BWMonApp.UsageByYear', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider.when('/UsageByYear', {
		templateUrl: 'usagebyyear/usageByYear.tpl.html',
		controller: 'UsageByYearController',
		controllerAs: 'usageByYearCtrl'
	});
})
.directive('yearTable', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<div class="table-responsive">',
					'<table class="table table-striped table-hover table-condensed">',
						'<thead><tr year-header></tr></thead>',
						'<tbody><tr year-body ng-repeat="current in usageByYearCtrl.data | orderBy:predicate:usageByYearCtrl.reverse"></tr></tbody>',
					'</table>',
				'</div>'
			].join('')
	};
})
.directive('yearHeader', function() {
	return {
		template: [
				'<th><a href="" ng-click="predicate=\'id\'; usageByYearCtrl.reverse=!usageByYearCtrl.reverse;">Year</a></th>',
				'<th class="text-right">Down</th>',
				'<th class="text-right">Up</th>',
				'<th class="text-right"><a href="" ng-click="predicate=\'total\'; usageByYearCtrl.reverse=!usageByYearCtrl.reverse">Total</a></th>',
				'<th class="text-right">Average</th>',
				'<th class="text-right">Days</th>'
			].join('')
	};
})
.directive('yearBody', function() {
	return {
		template: [
				'<td>{{current.id}}</td>',
				'<td class="text-right">{{::current.download | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.upload | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.total | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.average | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.days}}</td>'
			].join('')
	};
})
.directive('yearChartForm', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<form class="form-inline">',
					'<div class="form-group">',
						'<chart-type ng-model="usageByYearCtrl.selected.chartType" class="form-control" name="chartType"/>',
					'</div>',
				'</form>'
			].join('')
	};
})
.directive('yearChart', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<div>',
					'<linechart id="chartData" data="usageByYearCtrl.chartData" options="usageByYearCtrl.chartOptions"></linechart>',
				'</div>'
			].join('')
	};
})
.controller('UsageByYearController', function($scope, dataService, chartService) {
	var usageByYearCtrl = this;
	var usageData = dataService.getUsageByYear();

	usageByYearCtrl.selected = {};
	usageByYearCtrl.predicate = 'id';
	usageByYearCtrl.reverse = false;
	usageByYearCtrl.data = usageData.data;
	usageByYearCtrl.chartData = usageData.chartData;
	usageByYearCtrl.chartOptions = chartService.getChartOptions(usageByYearCtrl.chartData, chartService.getYearLabel, chartService.getYearLabel);

	$scope.$watch('usageByYearCtrl.selected.chartType', function() {
		usageByYearCtrl.chartOptions.series[0].type = usageByYearCtrl.selected.chartType;
	}, true);

});
