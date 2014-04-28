describe('NavigationController tests', function() {
	'use strict';

	var $scope = null,
		mockLocation;

	beforeEach(module('BWMonApp.controllers'));

	beforeEach(inject(function($rootScope, $controller, $location){
		$scope = $rootScope.$new();

		mockLocation = $location;
        spyOn(mockLocation, 'path').andReturn('/mypath');

		$controller('NavigationController', {
			$scope: $scope,
			$location: mockLocation
		});
	}));

	it('should return true', inject(function() {
		expect($scope.isActive('/mypath')).toBe(true);
	}));

	it('should return false', inject(function() {
		expect($scope.isActive('/mypath1')).toBe(false);
	}));
});
