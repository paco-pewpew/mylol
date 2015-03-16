'use strict';
angular.module('FrontpageController',[])
	.controller('FrontpageCtrl',['$scope','$http','$window','Templates','TemplatesById',function($scope,$http,$window,Templates,TempaltesById){
		//$scope.championList=JSON.parse($window.sessionStorage.championList);
		$scope.formData={};

		Templates.get()
			.success(function(data){
				$scope.templates=data;
			});

		$scope.deleteChamp=function(id){
			TemplatesById.delete(id)
				.success(function(data){
					$scope.templates=data;
				});
		};

		$scope.createChamp=function(){
			Templates.post($scope.formData)
				.success(function(data){
					$scope.templates=data;
					$scope.formData={};
				});		
		};

		$scope.derp=function(event){
			console.log(event);
		};
	}])
	.filter('limitFont',function(){
		return function(input,limit){
			if(input.length>limit){
				return input.slice(0,limit).concat('...');	
			}else{
				return input;
			}
		};
	});