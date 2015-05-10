(function() {
	'use strict';

	var AngularFrontpage = require('./AngularFrontpage.po.js');
	var AngularAccount = require('../account/AngularAccount.po.js');

	describe('frontpage', function() {
		var acc = new AngularAccount();
		var credentials = browser.params.login;
		var frontpage = new AngularFrontpage();

		beforeEach(function() {
			//login
			acc.goToPage();
			acc.setName(credentials.username);
			acc.setPassword(credentials.password);
			acc.login();
			expect(browser.getCurrentUrl()).toContain('#/home');
		});
		
		afterEach(function() {
			//logout
			element(by.css('[ng-click="vm.logoutUser()"]')).click();
		});



		it('should allow user to create new template', function() {
			var count;
			expect(element(by.repeater('template in filteredTemplates')).isPresent()).toBe(true);
			frontpage.sliderTemplates.count().then(function(rowCount) {
				count = rowCount;
			}).then(function() {
				expect(frontpage.templateNameInput.isPresent()).toBe(true);
				frontpage.setTemplateName('new template');
				expect(frontpage.createTemplateButton.isPresent()).toBe(true);
				frontpage.createTemplate();
				expect(frontpage.sliderTemplates.count()).toBe(count+1);
			});
		});

		it('should allow user to visit actual page of the template', function() {
			frontpage.sliderTemplates.last().element(by.binding('template.name')).click();
			expect(browser.getCurrentUrl()).toContain('#/template');
		});

		it('should allow user to delete templates', function() {
			var count;
			frontpage.sliderTemplates.count().then(function(rowCount) {
				count = rowCount;
			}).then(function() {
				//press delete button in last element of repeater
				frontpage.sliderTemplates.last().element(by.css('[ng-click="deleteFunction(template)"]')).click();
				expect(frontpage.sliderTemplates.count()).toBe(count-1);
			});
		});

	});

})();