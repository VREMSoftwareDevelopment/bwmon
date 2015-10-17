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
.controller('UsageByMonthController', function($scope, dataService, chartService) {
	var usageByMonthCtrl = this;

	usageByMonthCtrl.selected = {};
	usageByMonthCtrl.predicate = 'id';
	usageByMonthCtrl.reverse = false;

	$scope.$watch('usageByMonthCtrl.selected', function() {
		var usageData = dataService.getUsageByMonth(usageByMonthCtrl.selected.year);

		usageByMonthCtrl.data = usageData.data.usage;
		usageByMonthCtrl.total = usageData.data.total;
		usageByMonthCtrl.chartData = usageData.chartData;
		usageByMonthCtrl.chartOptions = chartService.getChartOptions(usageByMonthCtrl.chartData, chartService.getMonthLabel, chartService.getMonthLabel);
		usageByMonthCtrl.chartOptions.series[0].type = usageByMonthCtrl.selected.chartType;
	}, true);
})
;
