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
angular.module('BWMonApp.SelectMonth', [])
.directive('selectMonth', function() {
	return {
		restrict: 'E',
		replace: true,
		require: ['ngModel', 'year'],
		template: '<select ng-options="choiceMonth for choiceMonth in selectMonthCtrl.months"></select>',
		scope: {},
		bindToController: {
			month: '=ngModel',
			year: '=year'
		},
		controller: function($scope, dataService) {
			var ctrl = this;
			var updateMonth = function() {
				var months = dataService.getMonths(ctrl.year);
				ctrl.months = months;
				ctrl.month = months[0];
			};

			updateMonth();
			$scope.$watch('selectMonthCtrl.year', function() {
				updateMonth();
			}, true);
		},
		controllerAs: 'selectMonthCtrl'
	};
});

