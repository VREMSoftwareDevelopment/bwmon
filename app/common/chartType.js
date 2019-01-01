/*
 *    Copyright (C) 2010 - 2018 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
angular.module('BWMonApp.ChartType', [])
.directive('chartType', function() {
	return {
		restrict: 'E',
		replace: true,
		require: 'ngModel',
		template: '<select ng-options="choiceChartType for choiceChartType in ::chartTypeCtrl.chartTypes"></select>',
		scope: {},
		bindToController: {
			chartType: '=ngModel'
		},
		controller: function(chartService) {
			angular.extend(this, {
				chartTypes: chartService.getChartTypes()
			});
		},
		controllerAs: 'chartTypeCtrl'
	};
});
