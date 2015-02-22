'use strict';
angular.module('FormController',[])
	.controller('FormCtrl',['$http','$scope','$stateParams','$state','$window','$q','$timeout','Riot','Users',
		function($http,$scope,$stateParams,$state,$window,$q,$timeout,Riot,Users){
		$scope.signupForm={};
		$scope.loginForm={};
		$scope.lolacc={};

		$scope.checkBind=function(optionalCallback){
			Riot.getSummoner($scope.signupForm.region,$scope.signupForm.lolacc)
				.success(function(data){
					//$scope.lolacc=data[$scope.signupForm.lolacc];
					console.log(data);
					for(var user in data){
						$scope.lolacc=data[user];
					}

					delete $scope.errorBind;
					//if called from other functions such as processSingupForm
					if(optionalCallback!==undefined){
						optionalCallback();
					}
				})
				.error(function(data,status,headers,config){
					if(status===404)
						$scope.errorBind='account not found';
						$scope.lolacc={};
				});
		};

		$scope.processLoginForm = function() {
			Users.loginUser($scope.loginForm)
				.success(function(data){
					if(data.success===true){
						$scope.loginForm={};
						$window.sessionStorage.token = data.token;
						$window.sessionStorage.logged=true;
						$scope.setLoggedState($window.sessionStorage.logged);
						$state.go('home');
					}else{
						$scope.errorName=data.errors.name;
						$scope.errorPassword=data.errors.password;
					}
				})
				.error(function(data){
			        delete $window.sessionStorage.token;
			        $scope.message = 'Error: Invalid user or password';
					console.log(data);
				});
		};

	    $scope.processSignupForm = function() {
	    	//first check for valid LOL acc based on given info and gets data from it
	    	$scope.checkBind(function(){

	    		if($scope.errorBind){
		    		$state.go('account.form.bindlol');
		    	}else{

		    	//adds the lolid from riot api to the account
		    	$scope.signupForm.lolid=$scope.lolacc.id;
		    	$scope.signupForm.lolacc=$scope.lolacc.name;
	    		Users.createNewUser($scope.signupForm)
			    	.success(function (data) {
			    		console.log(data);
						if(data.success===true){
							$scope.signupForm={};
							$state.go('account.login');
						}else{
							$scope.errorName=data.errors.name;
							$scope.errorEmail=data.errors.email;
							$state.go('account.form.local');
						}
					});
				}
	    	});
	    	

    	};
	
}]);