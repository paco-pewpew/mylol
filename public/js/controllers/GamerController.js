'use strict';
angular.module('GamerController',['VisualDirectives'])
	.controller('GamerCtrl',['$scope','$window','Riot',function($scope,$window,Riot){
		$scope.championList=JSON.parse($window.sessionStorage.championList);
		$scope.awesomeData;
		$scope.mining=false;
		

		Riot.getSelfRecent()
			.success(function(data){
				$scope.recentMatchesData=data.games;
				$scope.lastChampionPlayed=data.games[0].championId;
			});

		Riot.getSelfStats()
			.success(function(data){
				$scope.mostPlayedChampions=data;
			});

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

	}])
	.directive('miningState',function(){
		return function(scope,element,attrs){
			attrs.$observe('miningState',function(value){
				/*if(value!==''){
					element.css({
						'background-image':'url(img/psGod/Inner.png),url(img/psGod/Outer.png)',
						'background-size':'contain',
						'height':'200px',
						'width':'200px',
						'margin-left':'200px',
						'-webkit-animation':'load 1.7s infinite ease'
					});
				}*/
			});
		};
	});
	