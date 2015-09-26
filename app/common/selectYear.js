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
angular.module('BWMonApp.SelectYear', [])
.directive('selectYear', ['dataService', function(dataService) {
	'use strict';
	return {
		restrict: 'E',
		replace: true,
		require: 'ngModel',
		scope: {selectYear: "=ngModel"},
		controller: function($scope) {
			$scope.years = dataService.getYears();
			$scope.selectYear = $scope.years[0];
		},
		template: '<div class="form-group">'+
			'<label class="sr-only" for="year">Year</label>'+
			'<select class="form-control" name="year" ng-model="selectYear" ng-options="choiceYear for choiceYear in ::years"></select>'+
			'</div>'
	};
}]);



