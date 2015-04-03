(function() {
    'use strict';

    angular
        .module('awesomeApp.gamer',['VisualDirectives','RiotDirectives'])
        .controller('GamerCtrl', GamerCtrl);

    /* @ngInject */
    function GamerCtrl(resStaticData,resBindInfo,Riot) {
        var vm = this;
        vm.userInfo=resBindInfo;
        vm.championList=resStaticData.championList;
        vm.fetchMostPlayedChampions=fetchRecentMatches;
        vm.recentMatches=[];
        vm.lastChampionPlayed='';
        vm.fetchMostPlayedChampions=fetchMostPlayedChampions;
        vm.mostPlayedChampions=[];
        vm.awesomeData;
        vm.awesomeFunctionality=awesomeFunctionality;
        vm.miningData;
        vm.miningFunctionality=miningFunctionality;

        vm.errors={
			recentMatches:false,
			mostPlayedChampions:false,
			message:'Error fetching data.'
		};

        activate();

        ////////////////

        function activate() {
        	fetchRecentMatches();
        	fetchMostPlayedChampions();
        }

        function fetchRecentMatches(){
        	console.log('fetching recent matches');
			Riot.getSelfRecent()
				.success(function(data){
					console.log('recent matches data',data);
					vm.errors.recentMatches=false;
					vm.recentMatches=data.games;
					vm.lastChampionPlayed=data.games[0].championId;
				})
				.error(function(data){
					vm.errors.recentMatches=true;
				});
		}

		function fetchMostPlayedChampions(){
			console.log('fetching most played champions');
			Riot.getSelfStats()
				.success(function(data){
					console.log('most played champions',data);
					vm.errors.mostPlayedChampions=false;
					vm.mostPlayedChampions=data;
				})
				.error(function(data){
					vm.errors.mostPlayedChampions=true;
				});
		}

		function awesomeFunctionality(){
			Riot.getSelfLeague()
				.success(function(data){
					console.log('success',data);
					vm.awesomeData=data;
					var yolo=data.champions;
					yolo.sort(function(a,b){
						return b.count-a.count;
					}).splice(yolo.length/4,yolo.length-1);

				})
				.error(function(data){
					console.log('error');
					console.log(data);
				});
		}

		function miningFunctionality(){
			vm.mining=true;
			Riot.getMining()
				.success(function(data){
					vm.mining=false;
					vm.miningData=data;
					vm.miningData.miningResult=Math.round(vm.miningData.result.probability*100);
					console.log('success');
					console.log(data);
				})
				.error(function(data){
					console.log('error');
					console.log(data);
				});
		}


    }
})();