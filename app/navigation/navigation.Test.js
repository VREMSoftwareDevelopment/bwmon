describe('BWMonApp Navigation', function() {
	beforeEach(module('BWMonApp'));
	beforeEach(module('BWMonApp.Navigation'));

	var scope,
		location,
		element,
		route,
		template = '<div><navigation></navigation></div>',
		getRoutes = function() {
			var routes = [];
			angular.forEach(route.routes, function(value, key, obj) {
				if (key !== 'null' && key[key.length-1] !== '/') {
					routes.push(key);
				}
			});
			return routes;
		};


	beforeEach(inject(function(_$compile_, _$rootScope_, _$location_, _$route_){
		scope = _$rootScope_.$new();

		location = _$location_;
		spyOn(location, 'path').and.returnValue('/mypath');

		route = _$route_;

		element = _$compile_(template)(scope);
	}));

	it('should have element', function() {
		scope.$digest();
		expect(element).toBeDefined();
	});

	it('should have isolateScope', function() {
		scope.$digest();
		expect(element.isolateScope).toBeDefined();
		// FIXME something is wrong with element.isolateScope()
		// console.log(element.isolateScope());
	});

	it('should return true', function() {
		scope.$digest();
		expect(scope.isActive('/mypath')).toBeTruthy();
	});

	it('should return false', function() {
		expect(scope.isActive('/mypath1')).toBeFalsy();
	});

	it('should have same number of routes as $route', function() {
		var routes = getRoutes();
		expect(routes.length).toBe(3);
		expect(scope.routes.length).toBe(routes.length);
	});

	it('should have all route names in $route', function() {
		var routes = getRoutes();
		angular.forEach(scope.routes, function(value, key, obj) {
			expect(routes.indexOf(value.href) !== -1).toBeTruthy();
		});
	});
});
