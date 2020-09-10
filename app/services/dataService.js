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
angular.module('BWMonApp.DataService', [])
.factory('dataService', function() {
	var _data = bwmonData(),
		_sort = function(a, b) {
			var result = b.year - a.year;
			if (result === 0) {
				result = b.month - a.month;
				if (result === 0) {
					result = a.IP < b.IP ? -1 : a.IP > b.IP ? 1 : 0;
					if (result === 0) {
						result = b.id - a.id;
					}
				}
			}
			return result;
		},
		_sum = function(entries, days, id) {
			var download = 0,
				upload = 0,
				total = 0;

			entries.forEach(function(entry) {
				download += entry.download;
				upload += entry.upload;
				total += entry.total;
			});

			return {
				id: id,
				download: download,
				upload: upload,
				total: total,
				average: +(total/days).toFixed(3),
				days: days
			};
		},
		_getMonths = function(year) {
			var result = _.filter(_data, {year: year});
			result = _.uniqBy(result, function(item){
				return item.month;
			});
			result = _.map(result, 'month');
			return result;
		},
		_getYears = function() {
			var result = _.uniqBy(_data, function(item){
				return item.year;
			});
			result = _.map(result, 'year');
			return result;
		},
		_getUsageByYear = function(year) {
			var days = moment([year, 11, 31]).dayOfYear(),
				usage = _.filter(_data, {year: year});

			return _sum(usage, days, year);
		},
		_getUsageByUser = function(year, month, filter) {
			var usage = _.filter(_data, {year: year, month: month}),
				days = moment([year, month]).daysInMonth(),
				total = _sum(usage, days, month);

			if (filter) {
				usage = _.filter(usage, function(entry) {
					var filterLowerCase = filter.toLowerCase();
					return entry.IP.toLowerCase().indexOf(filterLowerCase) !== -1 ||
						entry.MAC.toLowerCase().indexOf(filterLowerCase) !== -1 ||
						entry.user.toLowerCase().indexOf(filterLowerCase) !== -1;
				});
			}
			_.forEach(usage, function(value, index) {
				value.percent = +(value.total * 100/total.total).toFixed(1);
			});

			return {
				usage: usage,
				total: total
			};
		},
		_getUsageByMonth = function(year) {
			var	months = _getMonths(year),
				usage = _.map(months, function(entry) {
					return _getUsageByUser(year, entry).total;
				}),
				total = _getUsageByYear(year);

			_.each(usage, function(value, index) {
				value.percent = +(value.total * 100/total.total).toFixed(1);
			});
			return {
				usage: usage,
				total: total
			};
		},
		init = function() {
			_data.sort(_sort);
		};

	init();

	return {
		getYears: _getYears,
		getMonths: function(year) {
			var result = _getMonths(year);
			result = _.map(result, function(month) {
				return moment([year, month]).format("MMMM");
			});
			return result;
		},
		getUsageByUser: function(year, month, filter) {
			var result = _getUsageByUser(year, moment(year+'-'+month, "YYYY-MMMM").month(), filter);
			return {
				data: result
			};
		},
		getUsageByMonth: function(year) {
			var result = _getUsageByMonth(year);
			return {
				data: result
			};
		},
		getUsageByYear: function() {
			var result = _getYears();
			result = _.map(result, function(entry) {
				return _getUsageByYear(entry);
			});
			return {
				data: result,
			};
		}
	};
});
