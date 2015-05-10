(function() {
	'use strict';

	angular
	.module('awesomeApp.gamer', ['visualDirectives', 'awsRiot'])
	.controller('GamerCtrl', GamerCtrl);

	/* @ngInject */
	function GamerCtrl(resStaticData, resBindInfo, Riot, AjaxCall) {
		var vm = this;
		vm.userInfo = resBindInfo;
		vm.championList = resStaticData.championList;
		vm.lastChampionPlayed = '';
		vm.recentMatches = new AjaxCall(fetchRecentMatches);
		vm.mostPlayedChampions = new AjaxCall(fetchMostPlayedChampions);
		vm.hotPicks = new AjaxCall(fetchHotPicks);
		vm.bayesClassifier = new AjaxCall(miningFunctionality);

		activate();

		////////////////

		function activate() {
			vm.recentMatches.fetch();
			vm.mostPlayedChampions.fetch();
		}

		function fetchRecentMatches(){
			vm.recentMatches.isFetching = true;
			Riot.getSelfRecent()
			.success(function(data){
				vm.recentMatches.isFetching = false;
				vm.recentMatches.hasError = false;
				vm.recentMatches.data = data.games;
				vm.lastChampionPlayed = data.games[0].championId;
			})
			.error(function(){
				vm.recentMatches.isFetching = false;
				vm.recentMatches.hasError = true;
			});
		}

		function fetchMostPlayedChampions(){
			vm.mostPlayedChampions.isFetching = true;
			Riot.getSelfStats()
			.success(function(data){
				vm.mostPlayedChampions.isFetching = false;
				vm.mostPlayedChampions.hasError = false;
				vm.mostPlayedChampions.data = data;
			})
			.error(function(){
				vm.mostPlayedChampions.isFetching = false;
				vm.errors.mostPlayedChampions = true;
			});
		}

		function fetchHotPicks(){
			vm.hotPicks.isFetching = true;
			Riot.getSelfLeague()
			.success(function(data){
				vm.hotPicks.isFetching = false;
				data.champions.sort(function(a,b){
					return b.count-a.count;
				}).splice(data.champions.length/4,data.champions.length-1);
				vm.hotPicks.data = data;


			})
			.error(function(){
				vm.hotPicks.isFetching = false;
				vm.hotPicks.hasError = true;
			});
		}

		function miningFunctionality(){
			vm.bayesClassifier.isFetching = true;
			Riot.getMining()
			.success(function(data){
				vm.bayesClassifier.isFetching = false;
				vm.bayesClassifier.data = data;
				vm.bayesClassifier.data.miningResult = Math.round(vm.bayesClassifier.data.result.probability*100);
			})
			.error(function(data){
				vm.bayesClassifier.isFetching = false;
			});
		}

	}

})();