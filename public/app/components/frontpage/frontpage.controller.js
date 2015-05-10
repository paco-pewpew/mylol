(function() {
	'use strict';

	angular
	.module('awesomeApp.frontpage',['templatesData'])
	.controller('FrontpageCtrl', FrontpageCtrl);

	/* @ngInject */
	function FrontpageCtrl(templatesData) {
		var vm = this;
		vm.templates = [];
		vm.formData = {};
		vm.createTemplate = createTemplate;

		activate();

		////////////////

		function activate() {
			templatesData.query()
			.success(function(data) {
				vm.templates = data;
			});
		}

		function createTemplate() {
			templatesData.create(vm.formData)
			.success(function(data) {
				vm.templates = data;
				vm.formData = {};
			});	
		}

	}

})();