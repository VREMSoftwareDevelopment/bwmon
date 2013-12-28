angular.module('BWMonApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/UsageByMonth.tpl.html',
    "<form class=\"form-inline\" role=\"form\">\r" +
    "\n" +
    "\t<button id=\"buttonShowChart\" class=\"btn btn-primary\" ng-click=\"showChart=!showChart\">Show\r" +
    "\n" +
    "\t\t<span ng-show=\"showChart\">Data</span>\r" +
    "\n" +
    "\t\t<span ng-hide=\"showChart\">Chart</span>\r" +
    "\n" +
    "\t</button>\r" +
    "\n" +
    " \t<div class=\"form-group\">\r" +
    "\n" +
    "\t\t<label class=\"sr-only\" for=\"year\">Year</label>\r" +
    "\n" +
    "\t\t<select class=\"form-control\" name=\"year\" ng-model=\"year\" ng-options=\"choiceYear for choiceYear in years\"></select>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t<div ng-show=\"showChart\" class=\"form-group\">\r" +
    "\n" +
    "\t\t<label class=\"sr-only\" for=\"chartType\">Chart Type</label>\r" +
    "\n" +
    "\t\t<select class=\"form-control\" name=\"chartType\" ng-model=\"chartSeries[0].type\" ng-options=\"chartType for chartType in chartTypes\"></select>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</form>\r" +
    "\n" +
    "<div ng-show=\"showChart\">\r" +
    "\n" +
    "\t<linechart id=\"chartData\" data=\"chartData\" options=\"chartOptions\"></linechart>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div ng-hide=\"showChart\" class=\"table-responsive\">\r" +
    "\n" +
    "\t<table class=\"table table-striped table-hover table-condensed\">\r" +
    "\n" +
    "\t\t<thead>\r" +
    "\n" +
    "\t\t\t<tr>\r" +
    "\n" +
    "\t\t\t\t<th><a href=\"\" ng-click=\"predicate='id'; reverse=reverse===undefined ? false : !reverse;\">Month</a></th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">Down</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">Up</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\"><a href=\"\" ng-click=\"predicate='total'; reverse=!reverse\">Total</a></th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">Percent</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">Average</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">Days</th>\r" +
    "\n" +
    "\t\t\t</tr>\r" +
    "\n" +
    "\t\t</thead>\r" +
    "\n" +
    "\t\t<tbody>\r" +
    "\n" +
    "\t\t\t<tr ng-repeat=\"current in data | orderBy:predicate:reverse\">\r" +
    "\n" +
    "\t\t\t\t<td>{{current.id | toMonth}}</td>\r" +
    "\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.download | usageInGBytes | number:3}}</td>\r" +
    "\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.upload | usageInGBytes | number:3}}</td>\r" +
    "\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.total | usageInGBytes | number:3}}</td>\r" +
    "\n" +
    "\t\t\t\t<td class=\"text-right\">{{(current.total * 100 / total.total) | number:1}}%</td>\r" +
    "\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.average | usageInGBytes | number:3}}</td>\r" +
    "\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.days}}</td>\r" +
    "\n" +
    "\t\t\t</tr>\r" +
    "\n" +
    "\t\t</tbody>\r" +
    "\n" +
    "\t\t<tfoot>\r" +
    "\n" +
    "\t\t\t<tr>\r" +
    "\n" +
    "\t\t\t\t<th>{{year}} Totals</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.download | usageInGBytes | number:3}}</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.upload | usageInGBytes | number:3}}</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.total | usageInGBytes | number:3}}</th>\r" +
    "\n" +
    "\t\t\t\t<th></th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.average | usageInGBytes | number:3}}</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.days}}</th>\r" +
    "\n" +
    "\t\t\t</tr>\r" +
    "\n" +
    "\t\t</tfoot>\r" +
    "\n" +
    "\t</table>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/UsageByUser.tpl.html',
    "<form class=\"form-inline\" role=\"form\">\r" +
    "\n" +
    "\t<button id=\"buttonShowChart\" class=\"btn btn-primary\" ng-click=\"showChart=!showChart\">Show\r" +
    "\n" +
    "\t\t<span ng-show=\"showChart\">Data</span>\r" +
    "\n" +
    "\t\t<span ng-hide=\"showChart\">Chart</span>\r" +
    "\n" +
    "\t</button>\r" +
    "\n" +
    " \t<div class=\"form-group\">\r" +
    "\n" +
    "\t\t<label class=\"sr-only\" for=\"year\">Year</label>\r" +
    "\n" +
    "\t\t<select class=\"form-control\" name=\"year\" ng-model=\"selected.year\" ng-options=\"choiceYear for choiceYear in years\"></select>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    " \t<div class=\"form-group\">\r" +
    "\n" +
    "\t\t<label class=\"sr-only\" for=\"month\">Month</label>\r" +
    "\n" +
    "\t\t<select class=\"form-control\" name=\"month\" ng-model=\"selected.month\" ng-options=\"choiceMonth for choiceMonth in months\"></select>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    " \t<div class=\"form-group\">\r" +
    "\n" +
    "\t\t<label class=\"sr-only\" for=\"filter\">Filter by IP, MAC or User</label>\r" +
    "\n" +
    "\t\t<input class=\"form-control\" name=\"filter\" placeholder=\"IP, MAC or User\" ng-model=\"selected.filter\"/>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t<div ng-show=\"showChart\" class=\"form-group\">\r" +
    "\n" +
    "\t\t<label class=\"sr-only\" for=\"chartType\">Chart Type</label>\r" +
    "\n" +
    "\t\t<select class=\"form-control\" name=\"chartType\" ng-model=\"chartSeries[0].type\" ng-options=\"chartType for chartType in chartTypes\"></select>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t<div ng-hide=\"showChart\" class=\"form-group pull-right\">\r" +
    "\n" +
    "\t\t<span ng-show=\"page.hasPages(data)\">\r" +
    "\n" +
    "\t\t\t<button id=\"buttonPrevious\" class=\"btn btn-primary\" ng-disabled=\"!page.hasPrevious()\" ng-click=\"page.previous()\">Previous</button>\r" +
    "\n" +
    "\t\t\t<span>{{page.current + 1}}/{{page.pages(data)}}</span>\r" +
    "\n" +
    "\t\t\t<button id=\"buttonNext\" class=\"btn btn-primary\" ng-disabled=\"!page.hasNext(data)\" ng-click=\"page.next(data)\">Next</button>\r" +
    "\n" +
    "\t\t</span>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</form>\r" +
    "\n" +
    "<div ng-show=\"showChart\">\r" +
    "\n" +
    "\t<linechart id=\"chartData\" data=\"chartData\" options=\"chartOptions\"></linechart>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div ng-hide=\"showChart\" class=\"table-responsive\">\r" +
    "\n" +
    "\t<table class=\"table table-striped table-hover table-condensed\">\r" +
    "\n" +
    "\t\t<thead>\r" +
    "\n" +
    "\t\t\t<tr>\r" +
    "\n" +
    "\t\t\t\t<th><a href=\"\" ng-click=\"predicate='IP'; reverse=!reverse\">IP</a></th>\r" +
    "\n" +
    "\t\t\t\t<th><a href=\"\" ng-click=\"predicate='MAC'; reverse=!reverse\">MAC</a></th>\r" +
    "\n" +
    "\t\t\t\t<th><a href=\"\" ng-click=\"predicate='user'; reverse=!reverse\">User</a></th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">Down</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">Up</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\"><a href=\"\" ng-click=\"predicate='total'; reverse=!reverse\">Total</a></th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">Percent</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">Average</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">Days</th>\r" +
    "\n" +
    "\t\t\t\t<th>First Seen</th>\r" +
    "\n" +
    "\t\t\t\t<th>Last Seen</th>\r" +
    "\n" +
    "\t\t\t</tr>\r" +
    "\n" +
    "\t\t</thead>\r" +
    "\n" +
    "\t\t<tbody>\r" +
    "\n" +
    "\t\t\t<tr ng-repeat=\"current in data | orderBy:predicate: reverse | startFrom: page.startIndex() | limitTo: page.size\">\r" +
    "\n" +
    "\t\t\t\t<td>{{current.IP}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{current.MAC}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{current.user}}</td>\r" +
    "\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.download | usageInGBytes | number:3}}</td>\r" +
    "\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.upload | usageInGBytes | number:3}}</td>\r" +
    "\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.total | usageInGBytes | number:3}}</td>\r" +
    "\n" +
    "\t\t\t\t<td class=\"text-right\">{{(current.total * 100 / total.total) | number:1}}%</td>\r" +
    "\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.average | usageInGBytes | number:3}}</td>\r" +
    "\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.days}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{current.firstSeen | timeToDate | date: 'medium'}}</td>\r" +
    "\n" +
    "\t\t\t\t<td>{{current.lastSeen | timeToDate | date: 'medium'}}</td>\r" +
    "\n" +
    "\t\t\t</tr>\r" +
    "\n" +
    "\t\t</tbody>\r" +
    "\n" +
    "\t\t<tfoot>\r" +
    "\n" +
    "\t\t\t<tr>\r" +
    "\n" +
    "\t\t\t\t<th colspan=\"3\">{{selected.month}} {{selected.year}} Totals</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.download | usageInGBytes | number:3}}</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.upload | usageInGBytes | number:3}}</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.total | usageInGBytes | number:3}}</th>\r" +
    "\n" +
    "\t\t\t\t<th></th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.average | usageInGBytes | number:3}}</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">{{total.days}}</th>\r" +
    "\n" +
    "\t\t\t\t<th></th>\r" +
    "\n" +
    "\t\t\t\t<th></th>\r" +
    "\n" +
    "\t\t\t</tr>\r" +
    "\n" +
    "\t\t</tfoot>\r" +
    "\n" +
    "\t</table>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/UsageByYear.tpl.html',
    "<form class=\"form-inline\" role=\"form\">\r" +
    "\n" +
    "\t<button id=\"buttonShowChart\" class=\"btn btn-primary\" ng-click=\"showChart=!showChart\">Show\r" +
    "\n" +
    "\t\t<span ng-show=\"showChart\">Data</span>\r" +
    "\n" +
    "\t\t<span ng-hide=\"showChart\">Chart</span>\r" +
    "\n" +
    "\t</button>\r" +
    "\n" +
    "\t<div ng-show=\"showChart\" class=\"form-group\">\r" +
    "\n" +
    "\t\t<label class=\"sr-only\" for=\"chartType\">Chart Type</label>\r" +
    "\n" +
    "\t\t<select class=\"form-control\" name=\"chartType\" ng-model=\"chartSeries[0].type\" ng-options=\"chartType for chartType in chartTypes\"></select>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</form>\r" +
    "\n" +
    "<div ng-show=\"showChart\">\r" +
    "\n" +
    "\t<linechart id=\"chartData\" data=\"chartData\" options=\"chartOptions\"></linechart>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div ng-hide=\"showChart\" class=\"table-responsive\">\r" +
    "\n" +
    "\t<table class=\"table table-striped table-hover table-condensed\">\r" +
    "\n" +
    "\t\t<thead>\r" +
    "\n" +
    "\t\t\t<tr>\r" +
    "\n" +
    "\t\t\t\t<th><a href=\"\" ng-click=\"predicate='id'; reverse=reverse===undefined ? false : !reverse;\">Year</a></th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">Down</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">Up</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\"><a href=\"\" ng-click=\"predicate='total'; reverse=!reverse\">Total</a></th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">Average</th>\r" +
    "\n" +
    "\t\t\t\t<th class=\"text-right\">Days</th>\r" +
    "\n" +
    "\t\t\t</tr>\r" +
    "\n" +
    "\t\t</thead>\r" +
    "\n" +
    "\t\t<tbody>\r" +
    "\n" +
    "\t\t\t<tr ng-repeat=\"current in data | orderBy:predicate:reverse\">\r" +
    "\n" +
    "\t\t\t\t<td>{{current.id}}</td>\r" +
    "\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.download | usageInGBytes | number:3}}</td>\r" +
    "\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.upload | usageInGBytes | number:3}}</td>\r" +
    "\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.total | usageInGBytes | number:3}}</td>\r" +
    "\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.average | usageInGBytes | number:3}}</td>\r" +
    "\n" +
    "\t\t\t\t<td class=\"text-right\">{{current.days}}</td>\r" +
    "\n" +
    "\t\t\t</tr>\r" +
    "\n" +
    "\t\t</tbody>\r" +
    "\n" +
    "\t</table>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );

}]);
