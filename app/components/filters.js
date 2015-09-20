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
angular.module('BWMonApp.Filters', [])
.filter('startFrom', [function() {
	'use strict';
	return function(input, start) {
		return input.slice(start);
	};
}])
.filter('toMonth', [function() {
	'use strict';
	return function(month) {
		return moment([2012, month]).format("MMMM");
	};
}])
.filter('timeToDate', [function() {
	'use strict';
	return function(time) {
		return new Date(time*1000);
	};
}])
.filter('usageInGBytes', [function() {
	'use strict';
	return function(value) {
		return Math.round(value/1000)/1000;
	};
}]);
