describe('BWMonApp.DisplayType testing', function() {
	'use strict';

	var compile,
		scope,
		element,
		controller,
		template = '<div><display-type></display-type></div>';

	beforeEach(module('BWMonApp'));
	beforeEach(module('BWMonApp.DisplayType'));
	beforeEach(module("my.templates"));

	beforeEach(inject(function($controller, $compile, $rootScope){
		compile = $compile;
		scope = $rootScope;
		controller = $controller('displayTypeController');
		element = compile(template)(scope);
	}));

	it('should displayChart equals false', inject(function() {
		expect(controller.displayChart).toBe(false);
	}));

	it('should click change displayChart to true', inject(function() {
		controller.click();
		expect(controller.displayChart).toBe(true);
	}));

	it('should have element', function() {
		scope.$digest();
		expect(element).toBeDefined();
	});

	it('should have default values', function() {
		var button;

		scope.displayTypeCtrl = controller;
		scope.$digest();

		button = element.find('button');
		expect(scope.displayTypeCtrl.displayChart).toBe(false);
		expect(button.text()).not.toContain('Show Data');
		expect(button.text()).toContain('Show Chart');
	});

	it('should change after click', function() {
		var button;

		scope.displayTypeCtrl = controller;
		scope.$digest();

		button = element.find('button');
		button.triggerHandler('click');
		scope.$digest();

		button = element.find('button');
		expect(scope.displayTypeCtrl.displayChart).toBe(true);
		expect(button.text()).toContain('Show Data');
		expect(button.text()).not.toContain('Show Chart');
	});
});
