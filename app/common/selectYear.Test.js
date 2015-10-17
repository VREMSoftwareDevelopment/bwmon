describe('BWMonApp.SelectYear module, selectYear directive ', function() {
	var scope,
		dataService,
		years = ['10', '5', '6'],
		template = '<div><select-year ng-model="myYear"></select-year></div>',
		element;

	beforeEach(module('BWMonApp.SelectYear'));
	beforeEach(module('BWMonApp.DataService'));

	beforeEach(inject(function(_$compile_, _$rootScope_, _dataService_){
		scope = _$rootScope_.$new();

		dataService = _dataService_;
		spyOn(dataService, 'getYears').and.returnValue(years);

		element = _$compile_(template)(scope);
	}));

	it('should call dataService.getYears', function() {
		scope.$digest();
		expect(dataService.getYears).toHaveBeenCalled();
	});

	it('should have element', function() {
		scope.$digest();
		expect(element).toBeDefined();
	});

	it('should select first year in options', function() {
		var options;
		scope.$digest();
		options = element.find('select').find('option');
		expect(options[0].selected).toBeTruthy();
		expect(options[0].text).toBe(years[0]);
	});

	it('should have all years in options', function() {
		var index, options;
		scope.$digest();
		options = element.find('select').find('option');
		expect(options.length).toBe(years.length);
		for (index = 0; index < years.length; ++index) {
			expect(options[index].text).toBe(years[index]);
			expect(options[index].selected).toBe(index === 0 ? true : false);
		}
	});
});
