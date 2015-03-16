'use strict';
angular.module('AccountController',['RiotDirectives'])
	.controller('FormCtrl',['$http','$scope','$stateParams','$state','$window','Riot','Users',
		function($http,$scope,$stateParams,$state,$window,Riot,Users){
		$scope.signupForm={};
		$scope.loginForm={};
		$scope.bind={
			have:false,
			lolacc:{}
		};

		$scope.acceptBind=function(result){
			console.log('binding',result);
			$scope.bind={
				have:true,
				lolacc:result
			};

			$scope.signupForm.lolid=result.id;
			$scope.signupForm.lolacc=result.name;
			$scope.signupForm.region=result.region;
		};
		$scope.removeBind=function(){
			$scope.bind={
				have:false,
				lolacc:{}
			};
			delete $scope.signupForm.lolid;
			delete $scope.signupForm.lolacc;
			delete $scope.signupForm.region;
		};


		$scope.processLoginForm = function() {
			Users.loginUser($scope.loginForm)
				.success(function(data){
					if(data.success===true){
						$scope.loginForm={};
						$window.sessionStorage.token = data.token;
						$window.sessionStorage.logged=true;
						//$scope.setLoggedState($window.sessionStorage.logged);
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
			if(!$scope.bind.have){
				$state.go('account.form.bindlol');
			}else if($scope.signupForm.name===undefined){
				$state.go('account.form.local');
			}else{
				Users.createNewUser($scope.signupForm)
			    	.success(function(data) {
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
			
	    	

    	};
	
}]);