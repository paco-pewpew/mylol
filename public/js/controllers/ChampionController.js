'use strict';
angular.module('ChampionController',['VisualDirectives','RiotDirectives'])
	.controller('ChampionCtrl',['$scope','$http','$stateParams','ChampionById','Riot','resTemplate',
		function($scope,$http,$stateParams,ChampionById,Riot,resTemplate){

		$scope.champ=resTemplate;
		$scope.championTemplate={
			champion:resTemplate.champion,
			name:resTemplate.name,
			itemBuild:resTemplate.itemBuild
		};
		
		console.log(resTemplate);

		$scope.processChampionTemplate=function(){
			$scope.championTemplate.itemBuild=$scope.myBuild;
			ChampionById.put($scope.champ._id,$scope.championTemplate)
				.success(function(data){
					console.log(data);
					$scope.champ=data;
				});
		};

		$scope.rofl=function(){
			Riot.getSummonerMatchesByChampion()
				.success(function(data){
					console.log(data);
					$scope.watchedBuilds=data;
					$scope.itemsWatchedBuilds=[];
					$scope.watchedBuilds.forEach(function(match){
						[0,1,2,3,4,5].forEach(function(slot){
							$scope.itemsWatchedBuilds.push(match['item'+slot]);
						});
					});
					//filter unique
					$scope.itemsWatchedBuilds=$scope.itemsWatchedBuilds.filter(function(el,id,arr){
						return (arr.indexOf(el)===id && el!==0);
					});
					
				});
		};

		$scope.rofl();

		$scope.watchedPro={};
		$scope.bindWatchedPlayer=function(){
			Riot.getSummoner($scope.watchedPro.region,$scope.watchedPro.lolacc)
				.success(function(data){
					var player=data[Object.keys(data)[0]];
					$scope.watchedPro.lolid=player.id;
					$scope.watchedPro.lolacc=player.name;
					$scope.watchedPro.profileIconId=player.profileIconId;
					$scope.watchedPro.summonerLevel=player.summonerLevel;

					$scope.championTemplate.watchedPro=$scope.watchedPro;
					console.log(player);
				});
		};

		$scope.myBuild=[];
		$scope.addToBuild=function(item,index){
			if($scope.myBuild.length<6){
				$scope.itemsWatchedBuilds.splice(index,1);
				$scope.myBuild.push(item);	
			}
		};
		$scope.removeFromBuild=function(item,index){
			$scope.myBuild.splice(index,1);
			$scope.itemsWatchedBuilds.push(item);
		};
	
	}]);