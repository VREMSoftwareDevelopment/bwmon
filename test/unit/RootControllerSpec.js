describe('RootController tests', function(){
	'use strict';

	var $scope = null;

	beforeEach(module('BWMonApp.controllers'));
	beforeEach(inject(function($rootScope, $controller){
		$scope = $rootScope.$new();

		$controller('RootController', {
			$scope: $scope
		});
	}));

	it('should set current Date', inject(function(){
		var expected = $scope.clock,
			actual = $scope.currentDate;

		expect(expected).toEqual(actual);
	}));

	it('should set graph options - series ', inject(function(){
		var expected = [
				{color: '#3366CC', type: 'column', label: 'GBytes', y: 'total'},
			],
			actual = $scope.chartSeries;

		expect(expected).toEqual(actual);
	}));

	it('should set chart types', inject(function(){
		var expected = ['column', 'line', 'area'],
			actual = $scope.chartTypes;

		expect(expected).toEqual(actual);
	}));
});
