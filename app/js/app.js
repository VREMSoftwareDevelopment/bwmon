angular.module('BWMonApp', [
	'ngRoute',
	'n3-charts.linechart',
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
