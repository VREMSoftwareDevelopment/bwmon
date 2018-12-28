describe('BWMonApp.ChartService module, chartService factory ', function() {
	var chartService;
	
	beforeEach(module('BWMonApp.ChartService'));
	beforeEach(inject(function(_chartService_){
		chartService =_chartService_;
	}));

	it('should have all choices in chart types', function(){
		var expected = [
				['column'], 
				['line', 'dot'], 
				['line', 'dot', 'area']
			];
		expect(chartService.getChartTypes()).toEqual(expected);
	});

	it('should have margins', function() {
		var expected =  {
				top: 40,
				right: 40,
				bottom: 40,
				left: 40
			};
		expect(chartService.getChartOptions().margin).toEqual(expected);
	});

	it('should have chart series', function() {
		var expected = [{
			axis: 'y',
			dataset: 'dataset00',
			key: 'y',
			color: '#3366CC',
			label: 'GBytes',
			grid: {x: false, y: true},
			type: ['column'],
			id: 'series00'
		}];
		expect(chartService.getChartOptions().series).toEqual(expected);
	});

	it('should have x axes', function() {
		var expected = '{"key":"x"}',
			actual = JSON.stringify(chartService.getChartOptions().axes.x);
		expect(actual).toEqual(expected);
	});
	
	it('should have y axes', function() {
		var expected = {
				min: 0
			};
		expect(chartService.getChartOptions().axes.y).toEqual(expected);
	});
	
	it('should call provided label function', function() {
		var labelFn = function(value) {
				return 'myResult:'+value;
			},
			expected = 'myResult:1';
		expect(chartService.getChartOptions(labelFn).axes.x.tickFormat(1)).toEqual(expected);
	});

	it('should wrap chart data', function() {
		var data = [1, 2, 3],
			expected = {
				dataset00: data
			};
		expect(chartService.getChartData(data)).toEqual(expected);
	});

});
