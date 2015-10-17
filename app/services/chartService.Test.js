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
		expect(chartService.getChartTypes()).toEqual(['column', 'line', 'area']);
	});

	it('should have chart series', function() {
		expect(chartService.getChartOptions(data).series).toEqual([{y: 'total', color: '#3366CC', label: 'GBytes', type: 'column'}]);
	});

	it('should call provided label function', function() {
		var labelFn = function(value) {return 'myResult:'+value;};
		expect(chartService.getChartOptions(data, labelFn).axes.x.labelFunction(1)).toEqual('myResult:1');
	});

	it('should call provided tooltip function', function() {
		var tooltipFn = function(x, y) {return 'myResult:'+x;};
		expect(chartService.getChartOptions(data, undefined, tooltipFn).tooltip.formatter(1, 2)).toEqual('myResult:1 : 2');
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
		expect(chartService.getUserTooltip(0, data)).toEqual(data[0].user);
	});

	it('should return empty tooltip from data using invalid user', function() {
		expect(chartService.getUserTooltip(1, data)).toEqual('');
	});

});
