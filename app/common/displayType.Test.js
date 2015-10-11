describe('BWMonApp.DisplayType testing', function() {
	var scope,
		element,
		controller,
		template = '<div><display-type ng-model="showData"></display-type></div>';

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
		expect(scope.showData).toBeFalsy();
	});

	it('should contain Show Chart in button text', function() {
		scope.$digest();
		expect(element.find('button').text()).toContain('Show Chart');
	});

	it('should showData equals true', function() {
		scope.$digest();
		element.find('button').triggerHandler('click');
		expect(scope.showData).toBeTruthy();
	});

	it('should contain Show Data in button text', function() {
		scope.$digest();
		element.find('button').triggerHandler('click');
		expect(element.find('button').text()).toContain('Show Data');
	});
});
