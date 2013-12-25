angular.module('BWMonApp.filters', [])
.filter('interpolate', ['version', function(version) {
	'use strict';
	return function(text) {
		return String(text).replace(/\%VERSION\%/mg, version);
	};
}])
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
