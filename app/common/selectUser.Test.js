describe('BWMonApp.SelectUser testing', function() {
	'use strict';

	var scope,
		template = '<div><select-user ng-model="myUser"></select-user></div>',
		element;

	beforeEach(module('BWMonApp.SelectUser'));

	beforeEach(inject(function(_$compile_, _$rootScope_){
		scope = _$rootScope_.$new();

		element = _$compile_(template)(scope);
	}));

	it('should have element', function() {
		scope.$digest();
		expect(element).toBeDefined();
	});
});
