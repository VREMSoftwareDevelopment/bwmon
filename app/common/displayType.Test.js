describe('BWMonApp.DisplayType testing', function() {
	'use strict';

	var scope,
		element,
		controller,
		template = '<div><display-type ng-model="displayType"></display-type></div>';

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

	it('should contain Show Chart in button text', function() {
		scope.$digest();
		expect(element.find('button').text()).toContain('Show Chart');
	});
});
