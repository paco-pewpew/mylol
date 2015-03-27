'use strict';
angular.module('GamerController',['VisualDirectives','RiotDirectives'])
	.controller('GamerCtrl',['$scope','$window','resStaticData','loggedUser','Riot',function($scope,$window,resStaticData,loggedUser,Riot){
		//$scope.championList=JSON.parse($window.sessionStorage.championList);
		$scope.loggedUser=loggedUser;
		$scope.championList=resStaticData.championList;
		$scope.awesomeData;
		$scope.mining=false;
		$scope.errors={
			recentMatches:false,
			mostPlayedChampions:false,
			message:'Error fetching data.'
		};
		$scope.fetchRecentMatches=function(){
			Riot.getSelfRecent()
				.success(function(data){
					$scope.errors.recentMatches=false;
					$scope.recentMatches=data.games;
					$scope.lastChampionPlayed=data.games[0].championId;
				})
				.error(function(data){
					$scope.errors.recentMatches=true;
				});
		};
		$scope.fetchRecentMatches();

		$scope.fetchMostPlayedChampions=function(){
			console.log('fetching most played champions');
			Riot.getSelfStats()
				.success(function(data){
					$scope.errors.mostPlayedChampions=false;
					$scope.mostPlayedChampions=data;
				})
				.error(function(data){
					$scope.errors.mostPlayedChampions=true;
				});
		};
		$scope.fetchMostPlayedChampions();
		

		$scope.awesomeFunctionality=function(){
			Riot.getSelfLeague()
				.success(function(data){
					console.log('success');
					$scope.awesomeData=data;
					var yolo=data.champions;
					yolo.sort(function(a,b){
						return b.count-a.count;
					}).splice(yolo.length/4,yolo.length-1);

				})
				.error(function(data){
					console.log('error');
					console.log(data);
				});
		};


		$scope.miningFunctionality=function(){
			$scope.mining=true;
			Riot.getMining()
				.success(function(data){
					$scope.mining=false;
					$scope.noobOrPro=data;
					$scope.miningResult=Math.round($scope.noobOrPro.result.probability*100);
					console.log('success');
					console.log(data);
				})
				.error(function(data){
					console.log('error');
					console.log(data);
				});
		};

	}]);
	