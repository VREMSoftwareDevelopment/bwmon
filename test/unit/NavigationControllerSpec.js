describe('NavigationController tests', function() {
	'use strict';

	var $scope = null,
		mockLocation = {
			path: function() {
				return '/mypath';
			}
		};

	beforeEach(module('BWMonApp.controllers'));
	beforeEach(inject(function($rootScope, $controller){
		$scope = $rootScope.$new();

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
