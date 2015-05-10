(function() {
	'use strict';

	var AngularTemplates = require('./AngularTemplates.po.js');
	var AngularAccount = require('../account/AngularAccount.po.js');
	var AngularFrontpage = require('../frontpage/AngularFrontpage.po.js');

	describe('templates page', function() {
		var credentials = browser.params.login;
		var acc = new AngularAccount();
		var frontpage = new AngularFrontpage();
		var template = new AngularTemplates();

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

		it('should allow user to set up template - champion , watched players, builds', function() {
			//create new template
			frontpage.setTemplateName('new template');
			frontpage.createTemplate();
			
			//visit page
			frontpage.sliderTemplates.last().element(by.binding('template.name')).click();
			expect(browser.getCurrentUrl()).toContain('#/template');
			expect(element(by.binding('vm.templateResolved.name')).getText()).toContain('new template');

			//set new name
			element(by.model('vm.templateNew.name')).sendKeys('new updated template');
			
			//set champion
			element(by.model('vm.templateNew.champion')).sendKeys('Zed');

			//set first watched player
			template.newWatchedRegions.first().click();
			template.newWatchedSummoner.sendKeys('zeductive');
			template.newWatchedCheck.click();

			//check if the result summoner is same
			expect(template.newWatchedResult.getText()).toContain('zeductive');

			//accept
			template.newWatchedAccept.click();

			//new (last in arr) watched should be cleared and result added to the array with watched
			expect(template.lastWatchedSummoner.getText()).toContain('zeductive');

			//set second watched player
			template.newWatchedRegions.first().click();
			template.newWatchedSummoner.sendKeys('DMatev');
			template.newWatchedCheck.click();

			//accept
			template.newWatchedAccept.click();

			//new (last in arr) watched should be cleared and result added to the array with watched
			expect(template.lastWatchedSummoner.getText()).toContain('DMatev');
			
			//save template
			template.editTemplate();

			//TODO watched builds

			//TODO build maker

			//delete the template
			frontpage.goToPage();
			frontpage.sliderTemplates.last().element(by.css('[ng-click="deleteFunction(template)"]')).click();
		});

	});

})();