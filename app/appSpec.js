describe('BWMonApp tests', function(){
	'use strict';

	var scope, controller, route;

	beforeEach(module('BWMonApp'));

	beforeEach(inject(function($rootScope, $controller, $route) {
		scope = $rootScope.$new();

		controller = $controller('rootController', {
			$scope: scope
		});

		route = $route;
	}));

	it('should map UsageByUser route by default', function() {
		expect(route.routes[null].redirectTo).toEqual('/UsageByUser');
	});

	it('should set current Date', function() {
		expect(controller.clock).toEqual(controller.currentDate);
	});

});
