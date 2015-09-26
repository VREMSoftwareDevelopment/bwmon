describe('BWMonApp.DisplayType testing', function() {
	'use strict';

	var scope,
		element,
		controller,
		template = '<div><display-type></display-type></div>';

	beforeEach(module('BWMonApp'));
	beforeEach(module('BWMonApp.DisplayType'));

	beforeEach(inject(function(_$compile_, _$rootScope_){
		scope = _$rootScope_.$new();
		element = _$compile_(template)(scope);
	}));

	it('should have element', function() {
		scope.$digest();
		expect(element).toBeDefined();
	});

	it('should displayType equals false', function() {
		scope.$digest();
		expect(scope.displayType).toBeFalsy();
	});

	it('should toogle change displayType to true', function() {
		scope.$digest();
		scope.toggle();
		expect(scope.displayType).toBeTruthy();
	});

	it('should contain Show Chart in button text', function() {
		scope.$digest();
		expect(element.find('button').text()).not.toContain('Show Data');
		expect(element.find('button').text()).toContain('Show Chart');
	});

	it('should toogle change button text to Show Data', function() {
		scope.$digest();
		scope.toggle();
		scope.$digest();
		expect(element.find('button').text()).toContain('Show Data');
		expect(element.find('button').text()).not.toContain('Show Chart');
	});
});
