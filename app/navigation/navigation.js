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
angular.module('BWMonApp.Navigation', [])
.controller('navigationController', ['$location', function($location) {
	'use strict';
	var navigationController = this;

	navigationController.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};

	navigationController.routes = [{
		href: '/UsageByUser',
		name: 'Usage By User'
	}, {
		href: '/UsageByMonth',
		name: 'Usage By Month'
	}, {
		href: '/UsageByYear',
		name: 'Usage By Year'
	}];
}])
.directive('navigation', [function() {
	'use strict';
	return {
		templateUrl: 'navigation/navigation.tpl.html'
	};
}]);
