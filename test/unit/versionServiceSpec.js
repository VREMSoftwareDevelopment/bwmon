describe('BWMonApp.services version', function() {
	'use strict';

	beforeEach(module('BWMonApp.services'));

	it('should return current version', inject(function(version) {
		expect('2.2.1').toEqual(version);
	}));

});
