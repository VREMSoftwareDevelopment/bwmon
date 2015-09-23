describe('BWMonApp Navigation', function() {

	beforeEach(module('BWMonApp'));
	beforeEach(module('BWMonApp.Navigation'));

	describe('Controller testing', function() {
		var controller, location, route;

		beforeEach(inject(function($controller, $location, $route) {
			location = $location;
			spyOn(location, 'path').and.returnValue('/mypath');

			controller = $controller('navigationController', {
				$location: location
			});

			route = $route;
		}));

		it('should return true', inject(function() {
			expect(controller.isActive('/mypath')).toBe(true);
		}));

		it('should return false', inject(function() {
			expect(controller.isActive('/mypath1')).toBe(false);
		}));

		it('should have same number of routes as $route', inject(function() {
			var routes = [];
			angular.forEach(route.routes, function(value, key, obj) {
				if (key != 'null' && key[key.length-1] != '/') {
					routes.push(key);
				}
			});
			expect(controller.routes.length).toBe(routes.length);
		}));

		it('should have all route names in $route', inject(function() {
			var routes = [];
			angular.forEach(route.routes, function(value, key, obj) {
				if (key != 'null' && key[key.length-1] != '/') {
					routes.push(key);
				}
			});

			angular.forEach(controller.routes, function(value, key, obj) {
				expect(routes.indexOf(value.href) !== -1).toBe(true);
			});
		}));
	});

	describe('Template testing', function() {
		var compile, scope;

		beforeEach(module("my.templates"));

		beforeEach(inject(function($compile, $rootScope){
			compile = $compile;
			scope = $rootScope;
		}));

		it('should have element', function() {
			var template = '<div><navigation></navigation></div>',
				element = compile(template)(scope);
			scope.$digest();
			expect(element).toBeDefined();
		});
	});

});
