describe('BWMonApp.services chartService', function() {
	'use strict';

	var chartService = null;

	beforeEach(module('BWMonApp.ChartService'));
	beforeEach(inject(function(_chartService_){
		chartService =_chartService_;
	}));

	it('should get graph options - series', inject(function(){
		expect(chartService.getChartSeries()).toEqual([{color: '#3366CC', label: 'GBytes', y: 'total'}]);
	}));

	it('should get chart types', inject(function(){
		expect(chartService.getChartTypes()).toEqual(['column', 'line', 'area']);
	}));

});
