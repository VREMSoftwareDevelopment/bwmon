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
angular.module('BWMonApp.PagingService', [])
.factory('pagingService', function() {
	'use strict';

	var paging = {
		current: 0,
		size: 12,
		pages: function(data) {
			return Math.ceil(data.length / this.size);
		},
		startIndex: function() {
			return this.current * this.size;
		},
		hasPages: function(data) {
			return this.hasPrevious() || this.hasNext(data);
		},
		hasPrevious: function() {
			return this.current > 0;
		},
		hasNext: function(data) {
			return this.current < data.length / this.size - 1;
		},
		previous: function() {
			if (this.hasPrevious()) {
				this.current -= 1;
			}
		},
		next: function(data) {
			if (this.hasNext(data)) {
				this.current += 1;
			}
		}
	};

	return {
		getPaging: function() {
			return angular.extend({}, paging);
		}
	};
});
