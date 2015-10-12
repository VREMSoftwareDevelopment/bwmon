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
	'ui.bootstrap',
	'angularUtils.directives.dirPagination',
	'n3-line-chart',
	'BWMonApp.Filters',
	'BWMonApp.Navigation',
	'BWMonApp.UsageByUser',
	'BWMonApp.UsageByMonth',
	'BWMonApp.UsageByYear',
	'BWMonApp.SelectYear',
	'BWMonApp.SelectMonth',
	'BWMonApp.ChartType',
	'BWMonApp.ChartService',
	'BWMonApp.DataService'
])
.config(function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/UsageByUser'});
})
.controller('rootController', function($interval, $scope) {
	var rootController = this,
		updateClock = function() {
			rootController.clock = new Date();
		},
		clockOn = $interval(updateClock, 1000);

	updateClock();

	rootController.currentDate = rootController.clock;
	rootController.version = window.VERSION || 'SNAPSHOT';

	$scope.$on('$destroy', function(e) {
		$interval.cancel(clockOn);
	});
});
