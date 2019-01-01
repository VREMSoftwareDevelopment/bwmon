describe('BWMonApp.SelectMonth module, selectMonth directive', function() {
	var scope,
		dataService,
		controller,
		data,
		template,
		element;

	beforeEach(module('BWMonApp.SelectMonth'));
	beforeEach(module('BWMonApp.DataService'));

	beforeEach(inject(function(_$compile_, _$rootScope_, _dataService_){
		data = [{year: 1, months: ['Jan', 'Mar', 'Jun']}, {year: 2, months:  ['Nov', 'Oct']}];
		template = angular.element('<select-month ng-model="myMonth" year="myYear"></select-month></div>');

		scope = _$rootScope_.$new();
		scope.myYear = data[0].year;
		scope.myMonth = data[0].months[0];

		dataService = _dataService_;
		spyOn(dataService, 'getMonths').and.returnValue(data[0].months);

		element = _$compile_(template)(scope);
		controller = template.controller('selectMonth');

	}));

	it('should have element', function() {
		scope.$digest();
		expect(element).toBeDefined();
		expect(element.attr('ng-options')).toBe('choiceMonth for choiceMonth in selectMonthCtrl.months');
	});

	it('should call dataService.getMonths with parameter year', function() {
		scope.$digest();
		expect(dataService.getMonths).toHaveBeenCalledWith(data[0].year);
		expect(controller.year).toBe(data[0].year);
	});

	it('should select first month in options', function() {
		var options;
		scope.$digest();
		options = element.find('option');
		expect(options[0].selected).toBeTruthy();
		expect(options[0].text).toBe(data[0].months[0]);
		expect(controller.month).toBe(data[0].months[0]);
	});

	it('should have all months in options', function() {
		var index, options;
		scope.$digest();
		options = element.find('option');
		expect(options.length).toBe(data[0].months.length);
		expect(controller.months.length).toBe(data[0].months.length);
		for (index = 0; index < data[0].months.length; ++index) {
			expect(options[index].text).toBe(data[0].months[index]);
			expect(options[index].selected).toBe(index === 0 ? true : false);
			expect(controller.months[index]).toBe(data[0].months[index]);
		}
	});

	it('should call get months on year change', function() {
		scope.$digest();
		expect(dataService.getMonths).toHaveBeenCalledWith(data[0].year);
		controller.year = data[1].year;
		scope.$digest();
		expect(dataService.getMonths).toHaveBeenCalledWith(data[1].year);
	});
});
