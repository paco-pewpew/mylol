(function() {
	'use strict';

	var AngularFrontpage = function() {
		this.templateNameInput = element(by.model('vm.formData.name'));

		this.createTemplateButton = element(by.css('[ng-click="vm.createTemplate()"]'));

		this.sliderTemplates = element.all(by.repeater('template in filteredTemplates'));
		
		this.goToPage = function() {
			browser.get('#/home');
		};

		this.setTemplateName = function(name) {
			this.templateNameInput.sendKeys(name);
		};

		this.createTemplate = function() {
			this.createTemplateButton.click();
		};

	};

	module.exports = AngularFrontpage;

})();