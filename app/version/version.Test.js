describe('BWMonApp Version feature', function() {
	'use strict';

	beforeEach(module('BWMonApp.Version'));

	var expected = '2.2.3';

	it('should print current version', inject(function(_$compile_, _$rootScope_) {
		var actual = _$compile_('<span version></span>')(_$rootScope_).text();
		expect(expected).toEqual(actual);
	}));

	it('should replace VERSION', inject(function(_interpolateFilter_) {
		expect(_interpolateFilter_('before %VERSION% after')).toEqual('before '+expected+' after');
	}));

	it('should return current version', inject(function(_version_) {
		expect(expected).toEqual(_version_);
	}));

});
