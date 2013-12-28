describe('RouteProvider tests', function(){
	'use strict';

	beforeEach(module('BWMonApp'));

	it('should map UsageByUser route', inject(function($route){
		var route = $route.routes['/UsageByUser'];
		expect(route.controller).toBe('UsageByUserController');
		expect(route.templateUrl).toBe('templates/UsageByUser.tpl.html');
	}));

	it('should map UsageByMonth route', inject(function($route){
		var route = $route.routes['/UsageByMonth'];
		expect(route.controller).toBe('UsageByMonthController');
		expect(route.templateUrl).toBe('templates/UsageByMonth.tpl.html');
	}));

	it('should map UsageByYear route', inject(function($route){
		var route = $route.routes['/UsageByYear'];
		expect(route.controller).toBe('UsageByYearController');
		expect(route.templateUrl).toBe('templates/UsageByYear.tpl.html');
	}));

	it('should map UsageByUser route by default', inject(function($route){
		expect($route.routes[null].redirectTo).toEqual('/UsageByUser');
	}));
});
