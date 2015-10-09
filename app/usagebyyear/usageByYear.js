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
		controller: 'UsageByYearController'
	});
})
.directive('yearForm', function() {
	return {
		restrict: 'E',
		replace: true,
		template: '<form class="form-inline">'+
			'<display-type ng-model="displayType"/></display-type>'+
			'<div ng-if="displayType" class="form-group">'+
				'<label class="sr-only" for="chartType">Chart Type</label>'+
				'<chart-type ng-model="selected.chartType" class="form-control" name="chartType"/>'+
			'</div>'+
			'</form>'
	};
})
.directive('yearTable', function() {
	return {
		restrict: 'E',
		replace: true,
		template: '<div ng-if="!displayType" class="table-responsive">'+
			'<table class="table table-striped table-hover table-condensed">'+
			'<thead><tr year-header></tr></thead>'+
			'<tbody><tr year-body ng-repeat="current in data | orderBy:predicate:reverse"></tr></tbody>'+
			'</table>'+
			'</div>'
	};
})
.directive('yearHeader', function() {
	return {
		template: '<th><a href="" ng-click="predicate=\'id\'; reverse=!reverse;">Year</a></th>'+
			'<th class="text-right">Down</th>'+
			'<th class="text-right">Up</th>'+
			'<th class="text-right"><a href="" ng-click="predicate=\'total\'; reverse=!reverse">Total</a></th>'+
			'<th class="text-right">Average</th>'+
			'<th class="text-right">Days</th>'
	};
})
.directive('yearBody', function() {
	return {
		template: '<td>{{current.id}}</td>'+
			'<td class="text-right">{{::current.download | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{::current.upload | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{::current.total | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{::current.average | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{::current.days}}</td>'
	};
})
.controller('UsageByYearController', function($scope, dataService, chartService) {
	var usageData = dataService.getUsageByYear();

	$scope.selected = {};
	$scope.predicate = 'id';
	$scope.reverse = true;
	$scope.data = usageData.data;
	$scope.chartData = usageData.chartData;
	$scope.chartOptions = chartService.getChartOptions($scope.chartData, chartService.getYearLabel, chartService.getYearLabel);

	$scope.$watch('selected.chartType', function() {
		$scope.chartOptions.series[0].type = $scope.selected.chartType;
	}, true);

});
