(function() {
	'use strict';

	var AngularTemplates = function() {
		this.newWatchedSnippet = element.all(by.css('[accept="vm.addWatched(result)"]')).last();

		this.newWatchedRegions = this.newWatchedSnippet.all(by.repeater('region in vm.allowedRegions'));

		this.newWatchedSummoner = this.newWatchedSnippet.element(by.model('vm.searchForm.name'));

		this.newWatchedCheck = this.newWatchedSnippet.element(by.css('[ng-click="vm.checkAccount()"]'));

		this.newWatchedResult = this.newWatchedSnippet.element(by.binding('vm.result.name'));
		
		this.newWatchedAccept = this.newWatchedSnippet.element(by.css('[ng-click="vm.acceptSummoner()"]'));				

		this.watchedSnippets = element.all(by.repeater('summoner in vm.templateNew.watchedPros'));

		this.lastWatchedSnippets = element.all(by.repeater('summoner in vm.templateNew.watchedPros')).last();

		this.lastWatchedSummoner = this.lastWatchedSnippets.element(by.binding('vm.result.name'));

		this.editTemplate = function() {
			element(by.css('[ng-click="vm.processTemplate()"]')).click();
		};



	};

	module.exports = AngularTemplates;

})();