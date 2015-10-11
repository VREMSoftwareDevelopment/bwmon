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
		spyOn(location, 'path').and.returnValue('/UsageByMonth');
		route = _$route_;
		element = _$compile_(template)(scope);
	}));

	it('should have element', function() {
		scope.$digest();
		expect(element).toBeDefined();
	});

	it('should call location.path', function() {
		scope.$digest();
		expect(location.path).toHaveBeenCalled();
	});

	it('should have same number of routes', function() {
		var routes = getRoutes();
		scope.$digest();
		expect(routes.length).toBe(3);
		expect(element.find('li').find('a').length).toBe(routes.length);
	});

	it('should have all route names', function() {
		var routes = getRoutes();
		scope.$digest();
		angular.forEach(element.find('li').find('a'), function(value, key, obj) {
			expect(value.contains(routes[key]) !== -1).toBeTruthy();
		});
	});
});
