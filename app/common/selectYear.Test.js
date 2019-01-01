describe('BWMonApp.SelectYear module, selectYear directive ', function() {
	var scope,
		dataService,
		years,
		template,
		controller,
		element;

	beforeEach(module('BWMonApp.SelectYear'));
	beforeEach(module('BWMonApp.DataService'));

	beforeEach(inject(function(_$compile_, _$rootScope_, _dataService_){
		years = ['10', '5', '6'];
		template = angular.element('<select-year ng-model="myYear"></select-year>');

		scope = _$rootScope_.$new();
		scope.myYear = years[0];

		dataService = _dataService_;
		spyOn(dataService, 'getYears').and.returnValue(years);

		element = _$compile_(template)(scope);
		controller = template.controller('selectYear');
	}));

	it('should call dataService.getYears', function() {
		scope.$digest();
		expect(dataService.getYears).toHaveBeenCalled();
	});

	it('should have element', function() {
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.attr('ng-options')).toBe('choiceYear for choiceYear in ::selectYearCtrl.years');
	});

	it('should select first year in options', function() {
		var options;
		scope.$digest();
		options = element.find('option');
		expect(options[0].selected).toBeTruthy();
		expect(options[0].text).toBe(years[0]);
		expect(controller.year).toBe(years[0]);
	});

	it('should have all years in options', function() {
		var index, options;
		scope.$digest();
		options = element.find('option');
		expect(options.length).toBe(years.length);
		expect(controller.years.length).toBe(years.length);
		for (index = 0; index < years.length; ++index) {
			expect(options[index].text).toBe(years[index]);
			expect(options[index].selected).toBe(index === 0 ? true : false);
			expect(controller.years[index]).toBe(years[index]);
		}
	});
});
