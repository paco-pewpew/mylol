'use strict';
angular.module('MainController',[])
	.controller('MainCtrl',['$scope','$state','$window','Users','Riot',
		function($scope,$state,$window,Users,Riot){
		//binds logged state to sessionStorage or false(for first entry before its created)
		$scope.logged=$window.sessionStorage.logged||false;
		$scope.setLoggedState=function(value){
			$scope.logged=value;
		};

		//Retrieves champion info and makes id-name relation in object in session
		Riot.getChampionsList()
			.success(function(data){
				var list={};
				for(var champ in data.data){
						list[data.data[champ].id]=data.data[champ].key;
				}
				$window.sessionStorage.championList=JSON.stringify(list);
			});

		if($window.sessionStorage.userRiot){
			$scope.user=JSON.parse($window.sessionStorage.userRiot);
		}

		$scope.setUser=function(){
			$scope.user=JSON.parse($window.sessionStorage.userRiot);
		};

		$scope.logoutUser=function(){
			Users.logoutUser();
			$state.go('account.login');
		};

	}]);