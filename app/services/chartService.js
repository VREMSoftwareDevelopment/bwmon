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
angular.module('BWMonApp.ChartService', [])
.factory('chartService', function() {
	var _getChartTypes = function() {
			return [
				['column'], 
				['line', 'dot'], 
				['line', 'dot', 'area']
			];
		},
		_getChartOptions = function(labelFn, tooltipFn) {
			var getMargin = function() {
					return {
						top: 40,
						right: 40,
						bottom: 40,
						left: 40
					};
				},
				getSeries = function() {
					return [{
						axis: 'y',
						dataset: 'dataset00',
						key: 'y',
						color: '#3366CC',
						label: 'GBytes',
						grid: {
							x: false, 
							y: true
						},
						type: _getChartTypes()[0],
						id: 'series00'
					}];
				},
				getAxes = function() {
					return {
						x: { 
							key: 'x',
							tickFormat: labelFn
						},
						y: { 
							min: 0
						}
					};
				},
				tooltipHookFn = function(d) {
					if (d) {
						return {
							rows: d.map(function(s) {
								return {
									label: tooltipFn(s.row.x),
									value: " | " + s.row.y1 + " GB", 
									color: s.series.color,
									id: s.series.id 
								};
							})
						};
					}
				};
				
			return {
				margin: getMargin(),
				series: getSeries(),
				axes: getAxes(labelFn),
				tooltipHook: tooltipHookFn
			};
		},
		_getChartData = function(data) {
			var round = function(value) {
					return Math.round(value/1000)/1000;
				},
				sort = function(a, b) {
					var result = a.x - b.x;
					if (result === 0) {
						result = a.y - b.y;
					}
					return result;
				},
				transform = function(entry, key) {
					return {
						x: entry.id,
						y: round(entry.total)
					};
				}, 
				result = _.map(data, transform);
			result.sort(sort);
			return {
				dataset00: result
			};
		};

	return {
		getChartTypes: _getChartTypes,
		getChartOptions: _getChartOptions,
		getChartData: _getChartData
	};
});
