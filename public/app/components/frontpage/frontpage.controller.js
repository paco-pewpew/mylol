(function() {
    'use strict';

    angular
        .module('awesomeApp.frontpage',[])
        .controller('FrontpageCtrl', FrontpageCtrl);

    /* @ngInject */
    function FrontpageCtrl(templatesData) {
        var vm = this;
        vm.templates=[];
        vm.formData = {};
        vm.createChamp=createChamp;

        activate();

        ////////////////

        function activate() {
        	templatesData.query()
        		.success(function(data){
        			vm.templates=data;
        		});
        }
        
        function createChamp(){
        	templatesData.create(vm.formData)
				.success(function(data){
					vm.templates=data;
					vm.formData={};
				});	
        }

    }
})();