(function() {
	'use strict';

	describe('routes', function() {
		var accountUrl;

		it('should redirect to account page goes to unexisting page', function() {
			browser.get('#/account');
			accountUrl=browser.getCurrentUrl();

			browser.get('#');
			expect(browser.getCurrentUrl()).toBe(accountUrl);

			browser.get('#/unexisting-page');
			expect(browser.getCurrentUrl()).toBe(accountUrl);

		});

		it('should redirect to login page if user fails on authentication between routes', function() {
			browser.get('#/gamer');
			expect(browser.getCurrentUrl()).toBe(accountUrl.value_+'/login');
		});

	});

})();