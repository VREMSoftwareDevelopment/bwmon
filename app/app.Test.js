describe('BWMonApp module, ', function(){
	var scope;

	beforeEach(module('BWMonApp'));

	beforeEach(inject(function(_$rootScope_) {
		scope = _$rootScope_.$new();
	}));

	describe('config ', function() {
		var route;

		beforeEach(inject(function(_$route_) {
			route = _$route_;
		}));

		it('should route to UsageByUser by default', function() {
			expect(route.routes[null].redirectTo).toEqual('/UsageByUser');
		});
	});

	describe('rootController controller ', function() {
		var $controller, controller;

		beforeEach(inject(function(_$controller_) {
			$controller = _$controller_;
			controller = _$controller_('rootController', {
				$scope: scope,
			});
		}));

		it('should set currentDate and clock', function() {
			expect(controller.clock).toBeDefined();
			expect(controller.currentDate).toBeDefined();
			expect(controller.clock).toEqual(controller.currentDate);
		});

		it('should set current version to default', function() {
			expect(controller.version).toEqual('SNAPSHOT');
		});

		it('should set current version from window.VERSION', function() {
			var prevWindowVERSION = window.VERSION;
			window.VERSION = '1.2.3';
			controller = $controller('rootController', {
				$scope: scope,
			});
			expect(controller.version).toEqual(window.VERSION);
			window.VERSION = prevWindowVERSION;
		});

	});
});
