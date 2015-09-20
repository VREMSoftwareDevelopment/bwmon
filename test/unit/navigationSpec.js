describe('BWMonApp Navigation tests', function() {

	var $scope = null,
		mockLocation;

	beforeEach(module('BWMonApp.Navigation'));

	beforeEach(inject(function($rootScope, $controller, $location){
		$scope = $rootScope.$new();

		mockLocation = $location;
				spyOn(mockLocation, 'path').and.returnValue('/mypath');

		$controller('navigationController', {
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
