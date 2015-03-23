'use strict';
angular.module('FrontpageController',[])
	.controller('FrontpageCtrl',['$scope','$http','$window','Templates',function($scope,$http,$window,Templates){
		//$scope.championList=JSON.parse($window.sessionStorage.championList);
		$scope.formData={};
		$scope.templates={};

		Templates.get()
			.success(function(data){
				$scope.templates=data;
			});

		$scope.createChamp=function(){
			Templates.post($scope.formData)
				.success(function(data){
					$scope.templates=data;
					$scope.formData={};
				});		
		};
	}]);