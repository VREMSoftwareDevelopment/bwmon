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
		usageByUserCtrl.chartOptions.series[0].type = usageByUserCtrl.selected.chartType;
	}, true);
})
;
