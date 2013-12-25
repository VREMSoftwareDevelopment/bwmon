describe('directives', function() {
	'use strict';

	beforeEach(module('BWMonApp.directives'));

	describe('app-version', function() {
		it('should print current version', function() {
			module(function($provide) {
				$provide.value('version', 'TEST_VER');
			});
			inject(function($compile, $rootScope) {
				var expected = 'TEST_VER',
					actual = $compile('<span app-version></span>')($rootScope).text();

				expect(expected).toEqual(actual);
			});
		});
	});
});
