'use strict';
angular.module('MainController',[])
	.controller('MainCtrl',['$scope','$state','$window','resBindInfo','Users','Riot',
		function($scope,$state,$window,resBindInfo,Users,Riot){
		//binds logged state to sessionStorage or false(for first entry before its created)
		$scope.logged=$window.sessionStorage.logged||false;
		$scope.boundSummoner=resBindInfo;
		$scope.setLoggedState=function(value){
			$scope.logged=value;
		};

		if($window.sessionStorage.userRiot){
			$scope.user=JSON.parse($window.sessionStorage.userRiot);
		}

		$scope.setUser=function(){
			$scope.user=JSON.parse($window.sessionStorage.userRiot);
		};

		$scope.logoutUser=function(){
			Users.logoutUser();
			$scope.setLoggedState(false);
			$state.go('account.login');
		};

	}]);