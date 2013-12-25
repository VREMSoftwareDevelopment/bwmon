angular.module('BWMonApp.directives', [])
.directive('appVersion', ['version', function(version) {
	'use strict';
	return function(scope, elm, attrs) {
		elm.text(version);
	};
}]);
