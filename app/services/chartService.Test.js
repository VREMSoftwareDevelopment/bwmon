describe('BWMonApp.ChartService module, chartService factory ', function() {
	var chartService,
		data = [
			{id: 3, IP: 'IP3', MAC: 'MAC3', user: 'user3', total: 30},
			{id: 5, IP: 'IP5', MAC: 'MAC5', user: 'user5', total: 50},
			{id: 2, IP: 'IP2', MAC: 'MAC2', user: 'user2', total: 20},
			{id: 4, IP: 'IP4', MAC: 'MAC4', user: 'user4', total: 40},
			{id: 1, IP: 'IP1', MAC: 'MAC1', user: 'user1', total: 10}
		];
	
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
			key: 'y',
			color: '#3366CC',
			label: 'GBytes',
			grid: {x: false, y: true},
			type: ['column'],
			id: 'series00'
		}];
		expect(chartService.getChartOptions(data).series).toEqual(expected);
	});

	it('should have x axes', function() {
		var expected = '{"key":"x"}',
			actual = JSON.stringify(chartService.getChartOptions(data).axes.x);
		expect(actual).toEqual(expected);
	});
	
	it('should have y axes', function() {
		var expected = {
				min: 0
			};
		expect(chartService.getChartOptions(data).axes.y).toEqual(expected);
	});
	
	it('should call provided label function', function() {
		var labelFn = function(value) {
				return 'myResult:'+value;
			},
			expected = 'myResult:1';
		expect(chartService.getChartOptions(data, labelFn).axes.x.tickFormat(1)).toEqual(expected);
	});

	it('should return id from data using valid year', function() {
		expect(chartService.getYearLabel(10)).toEqual(10);
	});

	it('should return month from using valid month', function() {
		expect(chartService.getMonthLabel(0)).toEqual('January');
		expect(chartService.getMonthLabel(11)).toEqual('December');
	});

	it('should return empty label using invalid month', function() {
		expect(chartService.getMonthLabel(-1)).toEqual('');
		expect(chartService.getMonthLabel(12)).toEqual('');
	});

	it('should return empty user label', function() {
		expect(chartService.getUserLabel(4, data)).toEqual('IP4');
	});

	it('should return user tooltip label from data using valid user', function() {
		var expected = 'IP2 | MAC2 | user2';  
		expect(chartService.getUserTooltip(2, data)).toEqual(expected);
	});

	it('should return empty tooltip from data using invalid user', function() {
		expect(chartService.getUserTooltip(0, data)).toEqual('');
	});

	it('should wrap chart data', function() {
		var data = [1, 2, 3],
			expected = {
				dataset00: data
			};
		expect(chartService.getChartData(data)).toEqual(expected);
	});

});
