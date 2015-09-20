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
angular.module('BWMonApp.Version', [])
.value('version', '2.2.1')
.filter('interpolate', ['version', function(version) {
	'use strict';
	return function(text) {
		return String(text).replace(/\%VERSION\%/mg, version);
	};
}])
.directive('version', ['version', function(version) {
	'use strict';
	return function(scope, elm, attrs) {
		elm.text(version);
	};
}]);
