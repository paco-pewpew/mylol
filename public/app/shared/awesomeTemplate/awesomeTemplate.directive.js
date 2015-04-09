(function() {
    'use strict';

    angular
        .module('awsTemplate',[])
        .directive('awsTemplate', awsTemplate);

    /* @ngInject */
    function awsTemplate ($rootScope) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            link: link,
            restrict: 'EA',
            scope: {
            	championTemplate:'=template',
				deleteFunction:'&'
            },
            templateUrl:'app/shared/awesomeTemplate/awesomeTemplate.view.html'
        };
        return directive;

        function link(scope, element, attrs) {
        	element.bind('mouseenter',function(event){
				$rootScope.$broadcast('awesomeTemplateEntered',scope.championTemplate._id);
			});
        }
    }
})();	