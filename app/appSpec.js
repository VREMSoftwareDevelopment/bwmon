describe('BWMonApp tests', function(){
	'use strict';

	var scope = null, controller;

	beforeEach(module('BWMonApp'));

	describe('BWMonApp default route tests', function(){
		it('should map UsageByUser route by default', inject(function($route){
			expect($route.routes[null].redirectTo).toEqual('/UsageByUser');
		}));
	});

	describe('BWMonApp rootController tests', function(){
		beforeEach(inject(function($rootScope, $controller){
			scope = $rootScope.$new();

			controller = $controller('rootController', {
				$scope: scope
			});
		}));

		it('should set current Date', inject(function(){
			expect(controller.clock).toEqual(controller.currentDate);
		}));

		it('should set graph options - series ', inject(function(){
			expect(scope.chartSeries).toEqual([{color: '#3366CC', type: 'column', label: 'GBytes', y: 'total'}]);
		}));

		it('should set chart types', inject(function(){
			expect(scope.chartTypes).toEqual(['column', 'line', 'area']);
		}));
	});

});
