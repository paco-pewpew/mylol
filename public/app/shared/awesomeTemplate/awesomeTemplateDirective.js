'use strict';
angular.module('awesomeTemplateDirective',[])
	.directive('awesomeTemplate',function(){
		return{
			restrict:'EA',
			scope:{
				championTemplate:'=template',
				deleteFunction:'&'
			},
			controller:['$scope',function($scope){
				console.log($scope.deleteFunction);

				$scope.deleteTemplate=function(){
					$scope.deleteFunction();
				};
			}],
			/*link:function(scope,element,attrs){
				if(!attrs.deleteFunction){delete scope.deleteFunction;}
			},*/
			templateUrl:'app/shared/awesomeTemplate/awesomeTemplateView.html',
		};
	});