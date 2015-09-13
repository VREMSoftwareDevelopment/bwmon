angular.module('BWMonApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/UsageByMonth.tpl.html',
    "<form class=\"form-inline\" role=\"form\">\n" +
    "\t<button id=\"buttonShowChart\" class=\"btn btn-primary\" ng-click=\"showChart=!showChart\">Show\n" +
    "\t\t<span ng-show=\"showChart\">Data</span>\n" +
    "\t\t<span ng-hide=\"showChart\">Chart</span>\n" +
    "\t</button>\n" +
    " \t<div class=\"form-group\">\n" +
    "\t\t<label class=\"sr-only\" for=\"year\">Year</label>\n" +
    "\t\t<select class=\"form-control\" name=\"year\" ng-model=\"year\" ng-options=\"choiceYear for choiceYear in years\"></select>\n" +
    "\t</div>\n" +
    "\t<div ng-show=\"showChart\" class=\"form-group\">\n" +
    "\t\t<label class=\"sr-only\" for=\"chartType\">Chart Type</label>\n" +
    "\t\t<select class=\"form-control\" name=\"chartType\" ng-model=\"chartSeries[0].type\" ng-options=\"chartType for chartType in chartTypes\"></select>\n" +
    "\t</div>\n" +
    "</form>\n" +
    "<div ng-show=\"showChart\">\n" +
    "\t<linechart id=\"chartData\" data=\"chartData\" options=\"chartOptions\"></linechart>\n" +
    "</div>\n" +
    "<div ng-hide=\"showChart\" class=\"table-responsive\">\n" +
    "\t<table class=\"table table-striped table-hover table-condensed\">\n" +
    "\t\t<thead>\n" +
    "\t\t\t<tr>\n" +
    "\t\t\t\t<th><a href=\"\" ng-click=\"predicate='id'; reverse=!reverse;\">Month</a></th>\n" +
    "\t\t\t\t<th class=\"text-right\">Down</th>\n" +
    "\t\t\t\t<th class=\"text-right\">Up</th>\n" +
    "\t\t\t\t<th class=\"text-right\"><a href=\"\" ng-click=\"predicate='total'; reverse=!reverse\">Total</a></th>\n" +
    "\t\t\t\t<th class=\"text-right\">Percent</th>\n" +
    "\t\t\t\t<th class=\"text-right\">Average</th>\n" +
    "\t\t\t\t<th class=\"text-right\">Days</th>\n" +
    "\t\t\t</tr>\n" +
    "\t\t</thead>\n" +
    "\t\t<tbody>\n" +
    "\t\t\t<tr ng-repeat=\"current in data | orderBy:predicate:reverse\">\n" +
    "\t\t\t\t<td>{{current.id | toMonth}}</td>\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.download | usageInGBytes | number:3}}</td>\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.upload | usageInGBytes | number:3}}</td>\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.total | usageInGBytes | number:3}}</td>\n" +
    "\t\t\t\t<td class=\"text-right\">{{(current.total * 100 / total.total) | number:1}}%</td>\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.average | usageInGBytes | number:3}}</td>\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.days}}</td>\n" +
    "\t\t\t</tr>\n" +
    "\t\t</tbody>\n" +
    "\t\t<tfoot>\n" +
    "\t\t\t<tr>\n" +
    "\t\t\t\t<th>{{year}} Totals</th>\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.download | usageInGBytes | number:3}}</th>\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.upload | usageInGBytes | number:3}}</th>\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.total | usageInGBytes | number:3}}</th>\n" +
    "\t\t\t\t<th></th>\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.average | usageInGBytes | number:3}}</th>\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.days}}</th>\n" +
    "\t\t\t</tr>\n" +
    "\t\t</tfoot>\n" +
    "\t</table>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/UsageByUser.tpl.html',
    "<form class=\"form-inline\" role=\"form\">\n" +
    "\t<button id=\"buttonShowChart\" class=\"btn btn-primary\" ng-click=\"showChart=!showChart\">Show\n" +
    "\t\t<span ng-show=\"showChart\">Data</span>\n" +
    "\t\t<span ng-hide=\"showChart\">Chart</span>\n" +
    "\t</button>\n" +
    " \t<div class=\"form-group\">\n" +
    "\t\t<label class=\"sr-only\" for=\"year\">Year</label>\n" +
    "\t\t<select class=\"form-control\" name=\"year\" ng-model=\"selected.year\" ng-options=\"choiceYear for choiceYear in years\"></select>\n" +
    "\t</div>\n" +
    " \t<div class=\"form-group\">\n" +
    "\t\t<label class=\"sr-only\" for=\"month\">Month</label>\n" +
    "\t\t<select class=\"form-control\" name=\"month\" ng-model=\"selected.month\" ng-options=\"choiceMonth for choiceMonth in months\"></select>\n" +
    "\t</div>\n" +
    " \t<div class=\"form-group\">\n" +
    "\t\t<label class=\"sr-only\" for=\"filter\">Filter by IP, MAC or User</label>\n" +
    "\t\t<input class=\"form-control\" name=\"filter\" placeholder=\"IP, MAC or User\" ng-model=\"selected.filter\"/>\n" +
    "\t</div>\n" +
    "\t<div ng-show=\"showChart\" class=\"form-group\">\n" +
    "\t\t<label class=\"sr-only\" for=\"chartType\">Chart Type</label>\n" +
    "\t\t<select class=\"form-control\" name=\"chartType\" ng-model=\"chartSeries[0].type\" ng-options=\"chartType for chartType in chartTypes\"></select>\n" +
    "\t</div>\n" +
    "\t<div ng-hide=\"showChart\" class=\"form-group pull-right\">\n" +
    "\t\t<span ng-show=\"page.hasPages(data)\">\n" +
    "\t\t\t<button id=\"buttonPrevious\" class=\"btn btn-primary\" ng-disabled=\"!page.hasPrevious()\" ng-click=\"page.previous()\">Previous</button>\n" +
    "\t\t\t<span>{{page.current + 1}}/{{page.pages(data)}}</span>\n" +
    "\t\t\t<button id=\"buttonNext\" class=\"btn btn-primary\" ng-disabled=\"!page.hasNext(data)\" ng-click=\"page.next(data)\">Next</button>\n" +
    "\t\t</span>\n" +
    "\t</div>\n" +
    "</form>\n" +
    "<div ng-show=\"showChart\">\n" +
    "\t<linechart id=\"chartData\" data=\"chartData\" options=\"chartOptions\"></linechart>\n" +
    "</div>\n" +
    "<div ng-hide=\"showChart\" class=\"table-responsive\">\n" +
    "\t<table class=\"table table-striped table-hover table-condensed\">\n" +
    "\t\t<thead>\n" +
    "\t\t\t<tr>\n" +
    "\t\t\t\t<th><a href=\"\" ng-click=\"predicate='IP'; reverse=!reverse\">IP</a></th>\n" +
    "\t\t\t\t<th><a href=\"\" ng-click=\"predicate='MAC'; reverse=!reverse\">MAC</a></th>\n" +
    "\t\t\t\t<th><a href=\"\" ng-click=\"predicate='user'; reverse=!reverse\">User</a></th>\n" +
    "\t\t\t\t<th class=\"text-right\">Down</th>\n" +
    "\t\t\t\t<th class=\"text-right\">Up</th>\n" +
    "\t\t\t\t<th class=\"text-right\"><a href=\"\" ng-click=\"predicate='total'; reverse=!reverse\">Total</a></th>\n" +
    "\t\t\t\t<th class=\"text-right\">Percent</th>\n" +
    "\t\t\t\t<th class=\"text-right\">Average</th>\n" +
    "\t\t\t\t<th class=\"text-right\">Days</th>\n" +
    "\t\t\t\t<th>First Seen</th>\n" +
    "\t\t\t\t<th>Last Seen</th>\n" +
    "\t\t\t</tr>\n" +
    "\t\t</thead>\n" +
    "\t\t<tbody>\n" +
    "\t\t\t<tr ng-repeat=\"current in data | orderBy:predicate: reverse | startFrom: page.startIndex() | limitTo: page.size\">\n" +
    "\t\t\t\t<td>{{current.IP}}</td>\n" +
    "\t\t\t\t<td>{{current.MAC}}</td>\n" +
    "\t\t\t\t<td>{{current.user}}</td>\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.download | usageInGBytes | number:3}}</td>\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.upload | usageInGBytes | number:3}}</td>\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.total | usageInGBytes | number:3}}</td>\n" +
    "\t\t\t\t<td class=\"text-right\">{{(current.total * 100 / total.total) | number:1}}%</td>\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.average | usageInGBytes | number:3}}</td>\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.days}}</td>\n" +
    "\t\t\t\t<td>{{current.firstSeen | timeToDate | date: 'medium'}}</td>\n" +
    "\t\t\t\t<td>{{current.lastSeen | timeToDate | date: 'medium'}}</td>\n" +
    "\t\t\t</tr>\n" +
    "\t\t</tbody>\n" +
    "\t\t<tfoot>\n" +
    "\t\t\t<tr>\n" +
    "\t\t\t\t<th colspan=\"3\">{{selected.month}} {{selected.year}} Totals</th>\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.download | usageInGBytes | number:3}}</th>\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.upload | usageInGBytes | number:3}}</th>\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.total | usageInGBytes | number:3}}</th>\n" +
    "\t\t\t\t<th></th>\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.average | usageInGBytes | number:3}}</th>\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.days}}</th>\n" +
    "\t\t\t\t<th></th>\n" +
    "\t\t\t\t<th></th>\n" +
    "\t\t\t</tr>\n" +
    "\t\t</tfoot>\n" +
    "\t</table>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/UsageByYear.tpl.html',
    "<form class=\"form-inline\" role=\"form\">\n" +
    "\t<button id=\"buttonShowChart\" class=\"btn btn-primary\" ng-click=\"showChart=!showChart\">Show\n" +
    "\t\t<span ng-show=\"showChart\">Data</span>\n" +
    "\t\t<span ng-hide=\"showChart\">Chart</span>\n" +
    "\t</button>\n" +
    "\t<div ng-show=\"showChart\" class=\"form-group\">\n" +
    "\t\t<label class=\"sr-only\" for=\"chartType\">Chart Type</label>\n" +
    "\t\t<select class=\"form-control\" name=\"chartType\" ng-model=\"chartSeries[0].type\" ng-options=\"chartType for chartType in chartTypes\"></select>\n" +
    "\t</div>\n" +
    "</form>\n" +
    "<div ng-show=\"showChart\">\n" +
    "\t<linechart id=\"chartData\" data=\"chartData\" options=\"chartOptions\"></linechart>\n" +
    "</div>\n" +
    "<div ng-hide=\"showChart\" class=\"table-responsive\">\n" +
    "\t<table class=\"table table-striped table-hover table-condensed\">\n" +
    "\t\t<thead>\n" +
    "\t\t\t<tr>\n" +
    "\t\t\t\t<th><a href=\"\" ng-click=\"predicate='id'; reverse=!reverse;\">Year</a></th>\n" +
    "\t\t\t\t<th class=\"text-right\">Down</th>\n" +
    "\t\t\t\t<th class=\"text-right\">Up</th>\n" +
    "\t\t\t\t<th class=\"text-right\"><a href=\"\" ng-click=\"predicate='total'; reverse=!reverse\">Total</a></th>\n" +
    "\t\t\t\t<th class=\"text-right\">Average</th>\n" +
    "\t\t\t\t<th class=\"text-right\">Days</th>\n" +
    "\t\t\t</tr>\n" +
    "\t\t</thead>\n" +
    "\t\t<tbody>\n" +
    "\t\t\t<tr ng-repeat=\"current in data | orderBy:predicate:reverse\">\n" +
    "\t\t\t\t<td>{{current.id}}</td>\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.download | usageInGBytes | number:3}}</td>\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.upload | usageInGBytes | number:3}}</td>\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.total | usageInGBytes | number:3}}</td>\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.average | usageInGBytes | number:3}}</td>\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.days}}</td>\n" +
    "\t\t\t</tr>\n" +
    "\t\t</tbody>\n" +
    "\t</table>\n" +
    "</div>\n"
  );

}]);
