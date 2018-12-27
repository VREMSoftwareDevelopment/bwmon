describe('BWMonApp.ChartService module, chartService factory ', function() {
	var chartService,
		data = [{
			id: 11,
			IP: 5,
			user: 'user'
		}];

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
		expect(chartService.getChartOptions(data).margin).toEqual(expected);
	});

	it('should have chart series', function() {
		var expected = [{
			axis: 'y',
			dataset: 'dataset00',
			key: 'total',
			color: '#3366CC',
			label: 'GBytes',
			grid: {x: false, y: true},
			type: ['column'],
			id: 'series00'
		}];
		expect(chartService.getChartOptions(data).series).toEqual(expected);
	});

	it('should have axes', function() {
		var expected = '{"x":{"key":"x"}},"y":{"min":0}',
			actual = JSON.stringify(chartService.getChartOptions(data).axes);
		expect(actual).toEqual(expected);
	});
	
	it('should call provided label function', function() {
		var labelFn = function(value) {
				return 'myResult:'+value;
			},
			expected = 'myResult:1';
		expect(chartService.getChartOptions(data, labelFn).axes.x.tickFormat(1)).toEqual(expected);
	});

	it('should return id from data using valid year', function() {
		expect(chartService.getYearLabel(0, data)).toEqual(data[0].id);
	});

	it('should return empty label from data using invalid year', function() {
		expect(chartService.getYearLabel(1, data)).toEqual('');
	});

	it('should return month from using valid month', function() {
		expect(chartService.getMonthLabel(0)).toEqual('January');
		expect(chartService.getMonthLabel(11)).toEqual('December');
	});

	it('should return empty label using invalid month', function() {
		expect(chartService.getYearLabel(-1, data)).toEqual('');
		expect(chartService.getYearLabel(12, data)).toEqual('');
	});

	it('should return IP label from data using valid user', function() {
		expect(chartService.getUserLabel(0, data)).toEqual(data[0].IP);
	});

	it('should return empty label from data using invalid user', function() {
		expect(chartService.getUserLabel(1, data)).toEqual('');
	});

	it('should return user tooltip label from data using valid user', function() {
		var expected = data[0].user + " | " + data[0].IP + " | ";  
		expect(chartService.getUserTooltip(0, data)).toEqual(expected);
	});

	it('should return empty tooltip from data using invalid user', function() {
		expect(chartService.getUserTooltip(1, data)).toEqual('');
	});

});
