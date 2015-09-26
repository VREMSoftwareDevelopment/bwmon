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
angular.module('BWMonApp.DisplayType', [])
.directive('displayType', [function() {
	'use strict';
	return {
		restrict: 'E',
		replace: true,
		require: ['ngModel'],
		scope: {
			displayType: '=ngModel',
		},
		template: '<button id="buttonShowChart" class="btn btn-primary" ng-click="displayType=!displayType">'+
			'<span ng-if="!displayType">Show Chart</span>'+
			'<span ng-if="displayType">Show Data</span>'+
			'</button>'
	};
}]);
