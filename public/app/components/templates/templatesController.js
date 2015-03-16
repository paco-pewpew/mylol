'use strict';
angular.module('TemplateController',['VisualDirectives','RiotDirectives'])
	.controller('TemplateCtrl',['$scope','$http','$stateParams','$window','TemplatesById','Riot','resTemplate',
		function($scope,$http,$stateParams,$window,TemplatesById,Riot,resTemplate){
		
		$scope.championList=JSON.parse($window.sessionStorage.championList);

		$scope.champ=resTemplate;
		$scope.championTemplate={
			champion:resTemplate.champion,
			name:resTemplate.name,
			itemBuild:resTemplate.itemBuild,
			watchedPro:resTemplate.watchedPro,
			watchedPros:resTemplate.watchedPros||[]
		};

		
		$scope.omg=function(index){
			console.log('index of watched: ',index);
			$scope.championTemplate.watchedPros.splice(index,1);
		};

		$scope.wtf=function(result){
			console.log('wtf');
			if(result){
				console.log(result);
				$scope.championTemplate.watchedPro={
					lolid:result.id,
					lolacc:result.name,
					region:result.region,
					profileIconId:result.profileIconId,
					summonerLevel:result.summonerLevel,
				};
				$scope.championTemplate.watchedPros.push(result);

			};
		};

		console.log(resTemplate);

		$scope.processChampionTemplate=function(){
			($scope.myBuild)?$scope.championTemplate.itemBuild=$scope.myBuild:null;
			console.log($scope.championTemplate);
			TemplatesById.put($scope.champ._id,$scope.championTemplate)
				.success(function(data){
					console.log(data);
					$scope.champ=data;
				});
		};

		

		$scope.rofl=function(){
			//var watched=$scope.championTemplate.watchedPro||{lolid:21467921,region:'euw'};
			if($scope.championTemplate.watchedPros.length>0){
				console.log($scope.championTemplate.watchedPros);
				var watchedids=$scope.championTemplate.watchedPros.reduce(function(a,b){return a.concat((a.length?',':''),b.id);},'');
				var watchedregions=$scope.championTemplate.watchedPros.reduce(function(a,b){return a.concat((a.length?',':''),b.region);},'');
				var championId=Object.keys($scope.championList).filter(function(key){return $scope.championList[key]===$scope.championTemplate.champion;});

				//Riot.getSummonerMatchesByChampion(watched.region,watched.lolid,championId)
				Riot.getSummonerMatchesByChampion(watchedregions,watchedids,championId)
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
			}
			
		};

		$scope.rofl();

		$scope.watchedPro={};
		$scope.checkWatchedPlayer=function(){
			Riot.getSummoner($scope.watchedPro.region,$scope.watchedPro.lolacc)
				.success(function(data){
					var player=data[Object.keys(data)[0]];
					$scope.watchedPro.lolid=player.id;
					$scope.watchedPro.lolacc=player.name;
					$scope.watchedPro.profileIconId=player.profileIconId;
					$scope.watchedPro.summonerLevel=player.summonerLevel;
					console.log(player);
				});
		};
		$scope.bindWatchedPlayer=function(){
			$scope.championTemplate.watchedPro=$scope.watchedPro;
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