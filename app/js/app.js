/*
 *    Copyright (C) 2010 - 2014 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
	'BWMonApp.services',
	'BWMonApp.directives',
	'BWMonApp.controllers'
])
.config(['$routeProvider', function($routeProvider) {
	'use strict';
	$routeProvider.when('/UsageByUser', {
		templateUrl: 'templates/UsageByUser.tpl.html',
		controller: 'UsageByUserController'
	});
	$routeProvider.when('/UsageByMonth', {
		templateUrl: 'templates/UsageByMonth.tpl.html',
		controller: 'UsageByMonthController'
	});
	$routeProvider.when('/UsageByYear', {
		templateUrl: 'templates/UsageByYear.tpl.html',
		controller: 'UsageByYearController'
	});
	$routeProvider.otherwise({redirectTo: '/UsageByUser'});
}]);
