describe('BWMonApp.SelectMonth testing', function() {
	var scope,
		dataService,
		data = [
			{year: 1, months: ['Jan', 'Mar', 'Jun']},
			{year: 2, months:  ['Nov', 'Oct']}
		],
		template = '<div><select-month ng-model="myMonth" year="myYear"></select-month></div>',
		element;

	beforeEach(module('BWMonApp.SelectMonth'));
	beforeEach(module('BWMonApp.DataService'));

	beforeEach(inject(function(_$compile_, _$rootScope_, _dataService_){
		scope = _$rootScope_.$new();

		dataService = _dataService_;
		spyOn(dataService, 'getMonths').and.returnValue(data[0].months);

		element = _$compile_(template)(scope);
	}));

	it('should have element', function() {
		scope.$digest();
		expect(element).toBeDefined();
	});

	it('should call dataService.getMonths with parameter year', function() {
		scope.myYear = data[0].year;
		scope.$digest();
		expect(dataService.getMonths).toHaveBeenCalledWith(data[0].year);
	});

	it('should select first month in options', function() {
		var options;
		scope.$digest();
		options = element.find('select').find('option');
		expect(options[0].selected).toBeTruthy();
		expect(options[0].text).toBe(data[0].months[0]);
	});

	it('should have all months in options', function() {
		var index, options;
		scope.$digest();
		options = element.find('select').find('option');
		expect(options.length).toBe(data[0].months.length);
		for (index = 0; index < data[0].months.length; ++index) {
			expect(options[index].text).toBe(data[0].months[index]);
			expect(options[index].selected).toBe(index === 0 ? true : false);
		}
	});

	it('should call get months on year change', function() {
		scope.myYear = data[1].year;
		scope.$digest();
		expect(dataService.getMonths).toHaveBeenCalledWith(data[1].year);
	});
});
