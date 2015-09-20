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
angular.module('BWMonApp', [
	'ngRoute',
	'n3-line-chart',
	'BWMonApp.filters',
	'BWMonApp.Navigation',
	'BWMonApp.UsageByUser',
	'BWMonApp.UsageByMonth',
	'BWMonApp.UsageByYear',
	'BWMonApp.Version',
	'BWMonApp.PagingService',
	'BWMonApp.DataService'
])
.config(['$routeProvider', function($routeProvider) {
	'use strict';
	$routeProvider.otherwise({redirectTo: '/UsageByUser'});
}])
.controller('rootController', ['$interval', '$scope', function($interval, $scope) {
	'use strict';

	function updateClock() {
		$scope.clock = new Date();
	}

	var clockOn = $interval(updateClock, 1000);

	$scope.$on('$destroy', function(e) {
		$interval.cancel(clockOn);
	});

	updateClock();

	$scope.currentDate = $scope.clock;

	$scope.chartTypes = ['column', 'line', 'area'];
	$scope.chartSeries = [{
		y: 'total',
		color: '#3366CC',
		label: 'GBytes',
		type: $scope.chartTypes[0]
	}];

}]);

