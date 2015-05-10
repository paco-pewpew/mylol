(function() {
	'use strict';
	
	var AngularAccount = require('./AngularAccount.po.js');

	describe('account',function() {
		var acc = new AngularAccount();
		var credentials = browser.params.login;

		it('should have a working login form', function() {
			browser.get('#/account/login');
			acc.setName(credentials.username);
			acc.setPassword(credentials.password);
			acc.login();
			expect(browser.getCurrentUrl()).toBe('http://localhost:1337/#/home');
			expect(element(by.binding('vm.boundSummoner.local')).getText()).toBe('nubwalker'.toUpperCase());
			//logsout
			element(by.css('[ng-click="vm.logoutUser()"]')).click();
		});

	});

})();