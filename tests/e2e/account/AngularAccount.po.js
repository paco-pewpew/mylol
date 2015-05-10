(function() {
	'use strict';

	var AngularAccount = function() {
		this.nameInput = element(by.model('vm.loginForm.name'));
		this.passwordInput = element(by.model('vm.loginForm.password'));
		this.loginButton = element(by.css('[ng-click="vm.processLoginForm()"]'));

		this.goToPage = function() {
			browser.get('#/account/login');
		}

		this.setName = function(name) {
			this.nameInput.sendKeys(name);
		};

		this.setPassword = function(password) {
			this.passwordInput.sendKeys(password);
		};

		this.login = function() {
			this.loginButton.click();
		};

	};

	module.exports = AngularAccount;

})();