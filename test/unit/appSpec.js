describe('BWMonApp tests', function(){
	'use strict';

	var $scope = null;

	beforeEach(module('BWMonApp'));

	describe('BWMonApp default route tests', function(){
		it('should map UsageByUser route by default', inject(function($route){
			expect($route.routes[null].redirectTo).toEqual('/UsageByUser');
		}));
	});

	describe('BWMonApp rootController tests', function(){
		beforeEach(inject(function($rootScope, $controller){
			$scope = $rootScope.$new();

			$controller('rootController', {
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

});
