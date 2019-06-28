describe('BWMonApp.Navigation module, navigation directive', function() {
	var scope,
		location,
		element,
		route,
		controller,
		template,
		getRoutes = function() {
			var routes = [];
			angular.forEach(route.routes, function(value, key, obj) {
				if (key !== 'null' && key[key.length-1] !== '/') {
					routes.push(key);
				}
			});
			return routes;
		};

	beforeEach(module('BWMonApp'));
	beforeEach(module('BWMonApp.Navigation'));

	beforeEach(inject(function(_$compile_, _$rootScope_, _$location_, _$route_){
		template = angular.element('<div><navigation></navigation>');
		scope = _$rootScope_.$new();
		location = _$location_;
		spyOn(location, 'path').and.returnValue('/UsageByMonth');
		route = _$route_;
		element = _$compile_(template)(scope);
		controller = template.controller('navigation');
	}));

	it('should have element', function() {
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.find('li').attr('ng-repeat')).toBe('route in ::navigationCtrl.routes');
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
			var route = routes[key].substring(1);
			var href = value.getAttribute('href').substring(2);
			expect(href).toBe(route);
		});
	});
});
