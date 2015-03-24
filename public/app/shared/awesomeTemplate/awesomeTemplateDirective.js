'use strict';
angular.module('awesomeTemplateDirective',[])
	.directive('awesomeTemplate',['$rootScope',function($rootScope){
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
			link:function(scope,element,attrs){
				element.bind('mouseenter',function(event){
					$rootScope.$broadcast('awesomeTemplateEntered',scope.championTemplate._id);
				});
			},
			templateUrl:'app/shared/awesomeTemplate/awesomeTemplateView.html',
		};
	}]);