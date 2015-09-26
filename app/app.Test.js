describe('BWMonApp tests', function(){
	'use strict';

	var scope, controller, route;

	beforeEach(module('BWMonApp'));

	beforeEach(inject(function(_$rootScope_, _$controller_, _$route_) {
		scope = _$rootScope_.$new();

		controller = _$controller_('rootController', {
			$scope: scope
		});

		route = _$route_;
	}));

	it('should map UsageByUser route by default', function() {
		expect(route.routes[null].redirectTo).toEqual('/UsageByUser');
	});

	it('should set current Date', function() {
		expect(controller.clock).toEqual(controller.currentDate);
	});

});
