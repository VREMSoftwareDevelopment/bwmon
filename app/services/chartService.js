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
angular.module('BWMonApp.ChartService', [])
.factory('chartService', function() {
	'use strict';

	var _getYearLabel = function(value, data) {
			var result = '';
			if (value % 1 === 0 && typeof data[value] !== 'undefined' && data[value] !== null) {
				result = data[value].id;
			}
			return result;
		},
		_getMonthLabel = function(value) {
			var result = '';
			if (value % 1 === 0 && value >= 0 && value <= 11) {
				result = moment({month: value}).format("MMMM");
			}
			return result;
		},
		_getUserLabel = function(value, data) {
			var result = '';
			if (value % 1 === 0 && typeof data[value] !== 'undefined' && data[value] !== null) {
				result = data[value].IP;
			}
			return result;
		},
		_getUserTooltip = function(value, data) {
			var result = '';
			if (value % 1 === 0 && typeof data[value] !== 'undefined' && data[value] !== null) {
				result = data[value].user;
			}
			return result;
		},
		_getChartTypes = function() {
			return ['column', 'line', 'area'];
		},
		_getChartOptions = function(chartData, getLabel, getTooltip) {
			return {
				series: [{
					y: 'total',
					color: '#3366CC',
					label: 'GBytes',
					type: _getChartTypes()[0]
				}],
				axes: {
					x: {
						labelFunction: function(value) {
							return getLabel(value, chartData);
						},
						tooltipFormatter: function(value) {
							return getTooltip(value, chartData);
						}
					}
				}
			};
		};

	return {
		getYearLabel: _getYearLabel,
		getMonthLabel: _getMonthLabel,
		getUserLabel: _getUserLabel,
		getUserTooltip: _getUserTooltip,
		getChartTypes: _getChartTypes,
		getChartOptions: _getChartOptions
	};
});
