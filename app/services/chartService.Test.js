describe('BWMonApp.services chartService', function() {
	'use strict';

	var chartService,
		data = [{id: 11}];

	beforeEach(module('BWMonApp.ChartService'));
	beforeEach(inject(function(_chartService_){
		chartService =_chartService_;
	}));

	it('should have all options in chart series', function(){
		expect(chartService.getChartSeries()).toEqual([{color: '#3366CC', label: 'GBytes', y: 'total'}]);
	});

	it('should have all choices in chart types', function(){
		expect(chartService.getChartTypes()).toEqual(['column', 'line', 'area']);
	});

	it('should update graph options with chart series from ChartService', inject(function() {
		expect(chartService.getChartOptions(data).series).toEqual([{y: 'total', color: '#3366CC', label: 'GBytes', type: 'column'}]);
	}));

	it('should update graph options with non empty label - x axes', inject(function() {
		expect(chartService.getChartOptions(data).axes.x.labelFunction(0)).toEqual(data[0].id);
	}));

	it('should update graph options with empty label - x axes', inject(function() {
		expect(chartService.getChartOptions(data).axes.x.labelFunction(1.1)).toEqual('');
	}));

	it('should update graph options with non empty tootltip - x axes', inject(function() {
		expect(chartService.getChartOptions(data).axes.x.tooltipFormatter(0)).toEqual(data[0].id);
	}));

	it('should update graph options with empty tootltip - x axes', inject(function() {
		expect(chartService.getChartOptions(data).axes.x.tooltipFormatter(1.1)).toEqual('');
	}));

});
