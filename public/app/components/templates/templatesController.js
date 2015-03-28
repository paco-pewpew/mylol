'use strict';
angular.module('TemplateController',['VisualDirectives','RiotDirectives','awesomeTemplateDirective'])
	.controller('TemplateCtrl',['$scope','$http','$stateParams','$window','TemplatesById','Riot','resTemplate','resStaticData',
		function($scope,$http,$stateParams,$window,TemplatesById,Riot,resTemplate,resStaticData){
		$scope.itemsData=resStaticData.item;
		$scope.championList=resStaticData.championList;
		$scope.championNames=Object.keys($scope.championList).map(function(el){return $scope.championList[el];});
		$scope.templateResolved=resTemplate;
		$scope.watchedBuilds=[];
		$scope.itemsWatchedBuilds=[];
		$scope.myBuild=[];
		
		$scope.templateStatus={
			championUnset:false,
			watchedProsUnset:false,
			filled:false,
			setStatus:function(){
				this.championUnset=($scope.templateResolved.champion?false:true);
				this.watchedProsUnset=($scope.templateResolved.watchedPros.length>0?false:true);
				this.set=!(this.championUnset&&this.watchedProsUnset);
			}
		};
		$scope.$watch('templateResolved',function(oldVal,newVal){
			$scope.templateStatus.setStatus();
		});

		$scope.templateNew={
			champion:$scope.templateResolved.champion,
			name:$scope.templateResolved.name,
			itemBuild:$scope.templateResolved.itemBuild,
			watchedPros:[].concat($scope.templateResolved.watchedPros)
		};
		
		$scope.removeWatched=function(index){
			$scope.templateNew.watchedPros.splice(index,1);
		};

		$scope.addWatched=function(result){
			if(result){
				$scope.templateNew.watchedPros.push(result);
			};
		};


		$scope.processtemplateNew=function(){
			($scope.myBuild)?$scope.templateNew.itemBuild=$scope.myBuild:null;
			console.log($scope.templateNew);
			TemplatesById.put($scope.templateResolved._id,$scope.templateNew)
				.success(function(data){
					console.log(data);
					$scope.myBuild=[];
					$scope.templateResolved=data;
					$scope.getWatchedBuilds();
				})
				.error(function(data){
					console.log(data)
				});
		};

		

		$scope.getWatchedBuilds=function(){
			var championId=Object.keys($scope.championList).filter(function(key){return $scope.championList[key]===$scope.templateNew.champion;});
			if($scope.templateNew.watchedPros.length>0 && championId){
				var watchedids=$scope.templateNew.watchedPros.reduce(function(a,b){return a.concat((a.length?',':''),b.id);},'');
				var watchedregions=$scope.templateNew.watchedPros.reduce(function(a,b){return a.concat((a.length?',':''),b.region);},'');
				console.log(watchedids,watchedregions,championId);
				//Riot.getSummonerMatchesByChampion(watched.region,watched.lolid,championId)
				Riot.getSummonerMatchesByChampion(watchedregions,watchedids,championId)
					.success(function(data){
						console.log(data);
						$scope.watchedBuilds=data;
						$scope.watchedBuilds.forEach(function(match){
							[0,1,2,3,4,5].forEach(function(slot){
								$scope.itemsWatchedBuilds.push(match['item'+slot]);
							});
						});
						//filter unique
						$scope.itemsWatchedBuilds=$scope.itemsWatchedBuilds.filter(function(el,id,arr){
							return (arr.indexOf(el)===id && el!==0);
						});
						
					})
					.error(function(data){
						console.log('error fetching builds',data);
					});
			}
			
		};

		$scope.getWatchedBuilds();

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