describe('RouteProvider tests', function(){
	'use strict';

	beforeEach(module('BWMonApp'));

	it('should map UsageByUser route by default', inject(function($route){
		expect($route.routes[null].redirectTo).toEqual('/UsageByUser');
	}));
});
