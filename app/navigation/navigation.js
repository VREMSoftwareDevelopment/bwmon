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
angular.module('BWMonApp.Navigation', [])
.directive('navigation', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<div class="navbar navbar-default">',
					'<ul class="nav navbar-nav">',
						'<li ng-repeat="route in ::navigationCtrl.routes" ng-class="{active: navigationCtrl.isActive(\'{{::route.href}}\')}" >',
							'<a href="#{{::route.href}}">{{::route.name}}</a>',
						'</li>',
					'</ul>',
				'</div>'
			].join(''),
		scope: {},
		controller: function($scope, $location) {
			angular.extend(this, {
				isActive: function (viewLocation) {
					return viewLocation === $location.path();
				},
				routes: [{
					href: '/UsageByUser',
					name: 'Usage By User'
				}, {
					href: '/UsageByMonth',
					name: 'Usage By Month'
				}, {
					href: '/UsageByYear',
					name: 'Usage By Year'
				}]
			});
		},
		controllerAs: 'navigationCtrl'
	};
});
