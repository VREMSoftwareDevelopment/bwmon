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
angular.module('BWMonApp', [
	'ngRoute',
	'ui.bootstrap',
	'angularUtils.directives.dirPagination',
	'n3-line-chart',
	'BWMonApp.Filters',
	'BWMonApp.Navigation',
	'BWMonApp.UsageByUser',
	'BWMonApp.UsageByMonth',
	'BWMonApp.UsageByYear',
	'BWMonApp.SelectYear',
	'BWMonApp.SelectMonth',
	'BWMonApp.ChartType',
	'BWMonApp.ChartService',
	'BWMonApp.DataService'
])
.config(function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/UsageByUser'});
})
.controller('rootController', function($interval, $scope) {
	var rootController = this,
		updateClock = function() {
			rootController.clock = new Date();
		},
		clockOn = $interval(updateClock, 1000);

	updateClock();

	rootController.currentDate = rootController.clock;
	rootController.version = window.VERSION || 'SNAPSHOT';

	$scope.$on('$destroy', function(e) {
		$interval.cancel(clockOn);
	});
});
;angular.module("BWMonApp").run(["$templateCache", function($templateCache) {$templateCache.put("index.tpl.html","<!doctype html>\r\n<html lang=\"en\" ng-app=\"BWMonApp\" ng-controller=\"rootController as rootCtrl\">\r\n<head>\r\n	<meta charset=\"utf-8\">\r\n	<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\r\n	<title>Bandwidth Monitor Usage</title>\r\n<!-- @ifdef PRODUCTION -->\r\n	<link rel=\"stylesheet\" href=\"css/bootstrap.min.css\">\r\n	<link rel=\"stylesheet\" href=\"css/bwmon.min.css\">\r\n<!-- @endif -->\r\n<!-- @ifdef DEVELOPMENT -->\r\n	<link rel=\"stylesheet\" href=\"../bower_components/bootstrap/dist/css/bootstrap.min.css\">\r\n	<link rel=\"stylesheet\" href=\"css/app.css\">\r\n<!-- @endif -->\r\n</head>\r\n<body class=\"container\">\r\n	<h2>\r\n		<span class=\"pull-left\">Bandwidth Monitor Usage</span>\r\n		<small class=\"pull-right\">{{rootCtrl.clock  | date: \'medium\'}}</small>\r\n		<span class=\"clearfix\"></span>\r\n	</h2>\r\n	<navigation></navigation>\r\n	<div class=\"ng-view-min-height\">\r\n		<div ng-view></div>\r\n	</div>\r\n	<h5>\r\n		<b>All usage information is in gigabytes</b>\r\n	</h5>\r\n	<h5>\r\n		<span class=\"pull-left\">This page was generated on {{::rootCtrl.currentDate | date: \'medium\'}}</span>\r\n		<span class=\"pull-right\">Version {{::rootCtrl.version}}</span>\r\n		<span class=\"clearfix\"></span>\r\n	</h5>\r\n	<script src=\"bwmonUsage.js\"></script>\r\n<!-- @ifdef PRODUCTION -->\r\n	<script src=\"js/libs.js\"></script>\r\n	<script src=\"js/bwmon.min.js\"></script>\r\n<!-- @endif -->\r\n<!-- @ifdef DEVELOPMENT -->\r\n	<script src=\"../bower_components/angular/angular.min.js\"></script>\r\n	<script src=\"../bower_components/angular-route/angular-route.min.js\"></script>\r\n	<script src=\"../bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js\"></script>\r\n	<script src=\"../bower_components/angularUtils-pagination/dirPagination.js\"></script>\r\n	<script src=\"../bower_components/underscore/underscore-min.js\"></script>\r\n	<script src=\"../bower_components/momentjs/min/moment.min.js\"></script>\r\n	<script src=\"../bower_components/d3/d3.min.js\"></script>\r\n	<script src=\"../bower_components/n3-line-chart/build/line-chart.min.js\"></script>\r\n	<script src=\"app.js\"></script>\r\n	<script src=\"navigation/navigation.js\"></script>\r\n	<script src=\"services/dataService.js\"></script>\r\n	<script src=\"services/chartService.js\"></script>\r\n	<script src=\"usagebyuser/usageByUser.js\"></script>\r\n	<script src=\"usagebymonth/usageByMonth.js\"></script>\r\n	<script src=\"usagebyyear/usageByYear.js\"></script>\r\n	<script src=\"common/filters.js\"></script>\r\n	<script src=\"common/selectYear.js\"></script>\r\n	<script src=\"common/selectMonth.js\"></script>\r\n	<script src=\"common/chartType.js\"></script>\r\n<!-- @endif -->\r\n</body>\r\n</html>");
$templateCache.put("usagebymonth/usageByMonth.tpl.html","<uib-tabset justified=\"true\">\r\n	<uib-tab id=\"Data\" heading=\"Data\">\r\n		<month-form></month-form>\r\n		<month-table></month-table>\r\n	</uib-tab>\r\n	<uib-tab id=\"Chart\" heading=\"Chart\">\r\n		<month-chart-form></month-chart-form>\r\n		<month-chart></month-chart>\r\n	</uib-tab>\r\n</uib-tabset>");
$templateCache.put("usagebyuser/usageByUser.tpl.html","<uib-tabset justified=\"true\">\r\n	<uib-tab id=\"Data\" heading=\"Data\">\r\n		<user-form></user-form>\r\n		<user-table></user-table>\r\n	</uib-tab>\r\n	<uib-tab id=\"Chart\" heading=\"Chart\">\r\n		<user-chart-form></user-chart-form>\r\n		<user-chart></user-chart>\r\n	</uib-tab>\r\n</uib-tabset>");
$templateCache.put("usagebyyear/usageByYear.tpl.html","<uib-tabset justified=\"true\">\r\n	<uib-tab id=\"Data\" heading=\"Data\">\r\n		<year-table></year-table>\r\n	</uib-tab>\r\n	<uib-tab id=\"Chart\" heading=\"Chart\">\r\n		<year-chart-form></year-chart-form>\r\n		<year-chart></year-chart>\r\n	</uib-tab>\r\n</uib-tabset>");}]);;/*
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
angular.module('BWMonApp.ChartType', [])
.directive('chartType', function(chartService) {
	return {
		restrict: 'E',
		replace: true,
		require: 'ngModel',
		template: '<select ng-options="choiceChartType for choiceChartType in ::chartTypeCtrl.chartTypes"></select>',
		scope: {},
		bindToController: {
			chartType: '=ngModel'
		},
		controller: function() {
			var chartTypes = chartService.getChartTypes();
			angular.extend(this, {
				chartTypes: chartTypes,
				chartType: chartTypes[0]
			});
		},
		controllerAs: 'chartTypeCtrl'
	};
});
;/*
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
.filter('startFrom', function() {
	return function(input, start) {
		return input.slice(start);
	};
})
.filter('toMonth', function() {
	return function(month) {
		return moment([2012, month]).format("MMMM");
	};
})
.filter('timeToDate', function() {
	return function(time) {
		return new Date(time*1000);
	};
})
.filter('usageInGBytes', function() {
	return function(value) {
		return Math.round(value/1000)/1000;
	};
});
;/*
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
angular.module('BWMonApp.SelectMonth', [])
.directive('selectMonth', function(dataService) {
	return {
		restrict: 'E',
		replace: true,
		require: ['ngModel', 'year'],
		template: '<select ng-options="choiceMonth for choiceMonth in selectMonthCtrl.months"></select>',
		scope: {},
		bindToController: {
			month: '=ngModel',
			year: '=year'
		},
		controller: function($scope) {
			var ctrl = this;
			var updateMonth = function() {
				var months = dataService.getMonths(ctrl.year);
				ctrl.months = months;
				ctrl.month = months[0];
			};

			updateMonth();
			$scope.$watch('selectMonthCtrl.year', function() {
				updateMonth();
			}, true);
		},
		controllerAs: 'selectMonthCtrl'
	};
});

;/*
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
angular.module('BWMonApp.SelectYear', [])
.directive('selectYear', function(dataService) {
	return {
		restrict: 'E',
		replace: true,
		require: 'ngModel',
		template: '<select ng-options="choiceYear for choiceYear in ::selectYearCtrl.years"></select>',
		scope: {},
		bindToController: {
			year: '=ngModel'
		},
		controller: function() {
			var years = dataService.getYears();
			angular.extend(this, {
				years: years,
				year: years[0]
			});
		},
		controllerAs: 'selectYearCtrl'
	};
});
;/*
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
.directive('navigation', function($location) {
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
		controller: function($scope) {
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
;/*
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
		_getChartOptions = function(data, label, tooltip) {
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
							return label(value, data);
						}
					}
				},
				tooltip: {
					formatter: function(x, y, series) {
						return tooltip(x, data)  + ' : ' + y;
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
;/*
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
			var result = _.where(_data, {year: year});
			result = _.uniq(result, function(item){
				return item.month;
			});
			result = _.pluck(result, 'month');
			return result;
		},
		_getYears = function() {
			var result = _.uniq(_data, function(item){
				return item.year;
			});
			result = _.pluck(result, 'year');
			return result;
		},
		_getUsageByYear = function(year) {
			var days = moment([year, 11, 31]).dayOfYear(),
				usage = _.where(_data, {year: year});

			return _sum(usage, days, year);
		},
		_getUsageByUser = function(year, month, filter) {
			var usage = _.where(_data, {year: year, month: month}),
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
			_.each(usage, function(value, index) {
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
		_getChartData = function(data, reverse) {
			var chartData = [],
				usageData = data,
				round = function(value) {
					return Math.round(value/1000)/1000;
				};

			if (reverse) {
				usageData = data.slice().reverse();
			}
			chartData = _.map(usageData, function(entry, key) {
				var result = {
					x: key,
					id: entry.id,
					total: round(entry.total)
				};
				if (entry.IP) {result.IP = entry.IP;}
				if (entry.user) {result.user = entry.user;}
				return result;
			});
			return chartData;
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
				data: result,
				chartData: _getChartData(result.usage, false)
			};
		},
		getUsageByMonth: function(year) {
			var result = _getUsageByMonth(year);
			return {
				data: result,
				chartData: _getChartData(result.usage, true)
			};
		},
		getUsageByYear: function() {
			var result = _getYears();
			result = _.map(result, function(entry) {
				return _getUsageByYear(entry);
			});
			return {
				data: result,
				chartData: _getChartData(result, true)
			};
		}
	};
});
;/*
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
angular.module('BWMonApp.UsageByMonth', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider.when('/UsageByMonth', {
		templateUrl: 'usagebymonth/usageByMonth.tpl.html',
		controller: 'UsageByMonthController',
		controllerAs: 'usageByMonthCtrl'
	});
})
.directive('monthForm', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<form class="form-inline">',
					'<div class="form-group">',
						'<select-year ng-model="usageByMonthCtrl.selected.year" class="form-control" name="year"/>',
					'</div>',
				'</form>'
			].join('')
	};
})
.directive('monthTable', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<div class="table-responsive">',
					'<table class="table table-striped table-hover table-condensed">',
						'<thead><tr month-header></tr></thead>',
						'<tbody><tr month-body ng-repeat="current in usageByMonthCtrl.data | orderBy:predicate:usageByMonthCtrl.reverse"></tr></tbody>',
						'<tfoot><tr month-footer></tr></tfoot>',
					'</table>',
				'</div>'
			].join('')
	};
})
.directive('monthHeader', function() {
	return {
		template: [
				'<th><a href="" ng-click="predicate=\'id\'; usageByMonthCtrl.reverse=!usageByMonthCtrl.reverse;">Month</a></th>',
				'<th class="text-right">Down</th>',
				'<th class="text-right">Up</th>',
				'<th class="text-right"><a href="" ng-click="predicate=\'total\'; usageByMonthCtrl.reverse=!usageByMonthCtrl.reverse">Total</a></th>',
				'<th class="text-right">Percent</th>',
				'<th class="text-right">Average</th>',
				'<th class="text-right">Days</th>'
			].join('')
	};
})
.directive('monthBody', function() {
	return {
		template: [
				'<td>{{::current.id | toMonth}}</td>',
				'<td class="text-right">{{::current.download | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.upload | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.total | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.percent | number:1}}%</td>',
				'<td class="text-right">{{::current.average | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.days}}</td>'
			].join('')
	};
})
.directive('monthFooter', function() {
	return {
		template: [
				'<th>{{usageByMonthCtrl.selected.year}} Totals</th>',
				'<th class="text-right">{{::usageByMonthCtrl.total.download | usageInGBytes | number:3}}</th>',
				'<th class="text-right">{{::usageByMonthCtrl.total.upload | usageInGBytes | number:3}}</th>',
				'<th class="text-right">{{::usageByMonthCtrl.total.total | usageInGBytes | number:3}}</th>',
				'<th></th>',
				'<th class="text-right">{{::usageByMonthCtrl.total.average | usageInGBytes | number:3}}</th>',
				'<th class="text-right">{{::usageByMonthCtrl.total.days}}</th>'
			].join('')
	};
})
.directive('monthChartForm', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<form class="form-inline">',
					'<div class="form-group">',
						'<select-year ng-model="usageByMonthCtrl.selected.year" class="form-control" name="year"/>',
					'</div>',
					'<div class="form-group">',
						'<chart-type ng-model="usageByMonthCtrl.selected.chartType" class="form-control" name="chartType"/>',
					'</div>',
				'</form>'
			].join('')
	};
})
.directive('monthChart', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<div>',
					'<linechart id="chartData" data="usageByMonthCtrl.chartData" options="usageByMonthCtrl.chartOptions"></linechart>',
				'</div>'
			].join('')
	};
})
.controller('UsageByMonthController', function($scope, dataService, chartService) {
	var usageByMonthCtrl = this;

	usageByMonthCtrl.selected = {};
	usageByMonthCtrl.predicate = 'id';
	usageByMonthCtrl.reverse = false;

	$scope.$watch('usageByMonthCtrl.selected.year', function() {
		var usageData = dataService.getUsageByMonth(usageByMonthCtrl.selected.year);

		usageByMonthCtrl.data = usageData.data.usage;
		usageByMonthCtrl.total = usageData.data.total;
		usageByMonthCtrl.chartData = usageData.chartData;
		usageByMonthCtrl.chartOptions = chartService.getChartOptions(usageByMonthCtrl.chartData, chartService.getMonthLabel, chartService.getMonthLabel);
	}, true);

	$scope.$watch('usageByMonthCtrl.selected.chartType', function() {
		usageByMonthCtrl.chartOptions.series[0].type = usageByMonthCtrl.selected.chartType;
	}, true);

});
;/*
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
angular.module('BWMonApp.UsageByUser', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider.when('/UsageByUser', {
		templateUrl: 'usagebyuser/usageByUser.tpl.html',
		controller: 'UsageByUserController',
		controllerAs: 'usageByUserCtrl'
	});
})
.directive('userForm', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<form class="form-inline">',
					'<div class="form-group">',
						'<select-year ng-model="usageByUserCtrl.selected.year" class="form-control" name="year"/>',
					'</div>',
					'<div class="form-group">',
						'<select-month ng-model="usageByUserCtrl.selected.month" year="usageByUserCtrl.selected.year" class="form-control" name="month"/>',
					'</div>',
					'<div class="form-group">',
						'<input ng-model="usageByUserCtrl.selected.user" class="form-control" name="user" placeholder="IP, MAC or User"/>',
					'</div>',
					'<div class="form-group">',
						'<dir-pagination-controls max-size="5" boundary-links="true"></dir-pagination-controls>',
					'</div>',
				'</form>'
			].join('')
	};
})
.directive('userTable', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<div class="table-responsive">',
					'<table class="table table-striped table-hover table-condensed">',
						'<thead><tr user-header></tr></thead>',
						'<tbody><tr user-body dir-paginate="current in usageByUserCtrl.data | orderBy:predicate:usageByUserCtrl.reverse | itemsPerPage:usageByUserCtrl.pageSize"></tr></tbody>',
						'<tfoot><tr user-footer></tr></tfoot>',
					'</table>',
				'</div>'
			].join('')
	};
})
.directive('userHeader', function() {
	return {
		template: [
				'<th><a href="" ng-click="predicate=\'IP\'; usageByUserCtrl.reverse=!usageByUserCtrl.reverse">IP</a></th>',
				'<th><a href="" ng-click="predicate=\'MAC\'; usageByUserCtrl.reverse=!usageByUserCtrl.reverse">MAC</a></th>',
				'<th><a href="" ng-click="predicate=\'user\'; usageByUserCtrl.reverse=!usageByUserCtrl.reverse">User</a></th>',
				'<th class="text-right">Down</th>',
				'<th class="text-right">Up</th>',
				'<th class="text-right"><a href="" ng-click="predicate=\'total\'; usageByUserCtrl.reverse=!usageByUserCtrl.reverse">Total</a></th>',
				'<th class="text-right">Percent</th>',
				'<th class="text-right">Average</th>',
				'<th class="text-right">Days</th>',
				'<th>First Seen</th>',
				'<th>Last Seen</th>'
			].join('')
	};
})
.directive('userBody', function() {
	return {
		template: [
				'<td>{{::current.IP}}</td>',
				'<td>{{::current.MAC}}</td>',
				'<td>{{::current.user}}</td>',
				'<td class="text-right">{{::current.download | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.upload | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.total | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.percent | number:1}}%</td>',
				'<td class="text-right">{{::current.average | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.days}}</td>',
				'<td>{{::current.firstSeen | timeToDate | date: \'medium\'}}</td>',
				'<td>{{::current.lastSeen | timeToDate | date: \'medium\'}}</td>'
			].join('')
	};
})
.directive('userFooter', function() {
	return {
		template: [
				'<th colspan="3">{{::usageByUserCtrl.selected.month}} {{::usageByUserCtrl.selected.year}} Totals</th>',
				'<th class="text-right">{{::usageByUserCtrl.total.download | usageInGBytes | number:3}}</th>',
				'<th class="text-right">{{::usageByUserCtrl.total.upload | usageInGBytes | number:3}}</th>',
				'<th class="text-right">{{::usageByUserCtrl.total.total | usageInGBytes | number:3}}</th>',
				'<th></th>',
				'<th class="text-right">{{::usageByUserCtrl.total.average | usageInGBytes | number:3}}</th>',
				'<th class="text-right">{{::usageByUserCtrl.total.days}}</th>',
				'<th></th>',
				'<th></th>'
			].join('')
	};
})
.directive('userChartForm', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<form class="form-inline">',
					'<div class="form-group">',
						'<select-year ng-model="usageByUserCtrl.selected.year" class="form-control" name="year"/>',
					'</div>',
					'<div class="form-group">',
						'<select-month ng-model="usageByUserCtrl.selected.month" year="usageByUserCtrl.selected.year" class="form-control" name="month"/>',
					'</div>',
					'<div class="form-group">',
						'<input ng-model="usageByUserCtrl.selected.user" class="form-control" name="user" placeholder="IP, MAC or User"/>',
					'</div>',
					'<div class="form-group">',
						'<chart-type ng-model="usageByUserCtrl.selected.chartType" class="form-control" name="chartType"/>',
					'</div>',
				'</form>'
			].join('')
	};
})
.directive('userChart', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<div>',
					'<linechart id="chartData" data="usageByUserCtrl.chartData" options="usageByUserCtrl.chartOptions"></linechart>',
				'</div>'
			].join('')
	};
})
.controller('UsageByUserController', function($scope, dataService, chartService) {
	var usageByUserCtrl = this,
		reset = function() {
			usageByUserCtrl.selected.user = '';
		};

	usageByUserCtrl.selected = {};
	usageByUserCtrl.predicate = 'IP';
	usageByUserCtrl.reverse = false;
	usageByUserCtrl.pageSize = 12;

	$scope.$watch('usageByUserCtrl.selected.year', function() {
		reset();
		usageByUserCtrl.selected.month = dataService.getMonths(usageByUserCtrl.selected.year)[0];
	}, true);

	$scope.$watch('usageByUserCtrl.selected.month', function() {
		reset();
	}, true);

	$scope.$watch('usageByUserCtrl.selected', function() {
		var usageData = dataService.getUsageByUser(usageByUserCtrl.selected.year, usageByUserCtrl.selected.month, usageByUserCtrl.selected.user);
		usageByUserCtrl.data = usageData.data.usage;
		usageByUserCtrl.total = usageData.data.total;
		usageByUserCtrl.chartData = usageData.chartData;
		usageByUserCtrl.chartOptions = chartService.getChartOptions(usageByUserCtrl.chartData, chartService.getUserLabel, chartService.getUserTooltip);
	}, true);

	$scope.$watch('usageByUserCtrl.selected.chartType', function() {
		usageByUserCtrl.chartOptions.series[0].type = usageByUserCtrl.selected.chartType;
	}, true);
});
;/*
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
angular.module('BWMonApp.UsageByYear', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider.when('/UsageByYear', {
		templateUrl: 'usagebyyear/usageByYear.tpl.html',
		controller: 'UsageByYearController',
		controllerAs: 'usageByYearCtrl'
	});
})
.directive('yearTable', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<div class="table-responsive">',
					'<table class="table table-striped table-hover table-condensed">',
						'<thead><tr year-header></tr></thead>',
						'<tbody><tr year-body ng-repeat="current in usageByYearCtrl.data | orderBy:predicate:usageByYearCtrl.reverse"></tr></tbody>',
					'</table>',
				'</div>'
			].join('')
	};
})
.directive('yearHeader', function() {
	return {
		template: [
				'<th><a href="" ng-click="predicate=\'id\'; usageByYearCtrl.reverse=!usageByYearCtrl.reverse;">Year</a></th>',
				'<th class="text-right">Down</th>',
				'<th class="text-right">Up</th>',
				'<th class="text-right"><a href="" ng-click="predicate=\'total\'; usageByYearCtrl.reverse=!usageByYearCtrl.reverse">Total</a></th>',
				'<th class="text-right">Average</th>',
				'<th class="text-right">Days</th>'
			].join('')
	};
})
.directive('yearBody', function() {
	return {
		template: [
				'<td>{{current.id}}</td>',
				'<td class="text-right">{{::current.download | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.upload | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.total | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.average | usageInGBytes | number:3}}</td>',
				'<td class="text-right">{{::current.days}}</td>'
			].join('')
	};
})
.directive('yearChartForm', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<form class="form-inline">',
					'<div class="form-group">',
						'<chart-type ng-model="usageByYearCtrl.selected.chartType" class="form-control" name="chartType"/>',
					'</div>',
				'</form>'
			].join('')
	};
})
.directive('yearChart', function() {
	return {
		restrict: 'E',
		replace: true,
		template: [
				'<div>',
					'<linechart id="chartData" data="usageByYearCtrl.chartData" options="usageByYearCtrl.chartOptions"></linechart>',
				'</div>'
			].join('')
	};
})
.controller('UsageByYearController', function($scope, dataService, chartService) {
	var usageByYearCtrl = this;
	var usageData = dataService.getUsageByYear();

	usageByYearCtrl.selected = {};
	usageByYearCtrl.predicate = 'id';
	usageByYearCtrl.reverse = false;
	usageByYearCtrl.data = usageData.data;
	usageByYearCtrl.chartData = usageData.chartData;
	usageByYearCtrl.chartOptions = chartService.getChartOptions(usageByYearCtrl.chartData, chartService.getYearLabel, chartService.getYearLabel);

	$scope.$watch('usageByYearCtrl.selected.chartType', function() {
		usageByYearCtrl.chartOptions.series[0].type = usageByYearCtrl.selected.chartType;
	}, true);

});
