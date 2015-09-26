describe('BWMonApp.DisplayType testing', function() {
	'use strict';

	var $compile,
		$rootScope,
		element,
		controller,
		template = '<div><display-type></display-type></div>';

	beforeEach(module('BWMonApp'));
	beforeEach(module('BWMonApp.DisplayType'));

	beforeEach(inject(function(_$compile_, _$rootScope_){
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		element = $compile(template)($rootScope);
	}));

	it('should have element', function() {
		$rootScope.$digest();
		expect(element).toBeDefined();
	});

	it('should displayType equals false', function() {
		$rootScope.$digest();
		expect($rootScope.displayType).toBeFalsy();
	});

	it('should toogle change displayType to true', function() {
		$rootScope.$digest();
		$rootScope.toggle();
		expect($rootScope.displayType).toBeTruthy();
	});

	it('should contain Show Chart in button text', function() {
		$rootScope.$digest();
		expect(element.find('button').text()).not.toContain('Show Data');
		expect(element.find('button').text()).toContain('Show Chart');
	});

	it('should toogle change button text to Show Data', function() {
		$rootScope.$digest();
		$rootScope.toggle();
		$rootScope.$digest();
		expect(element.find('button').text()).toContain('Show Data');
		expect(element.find('button').text()).not.toContain('Show Chart');
	});
});
