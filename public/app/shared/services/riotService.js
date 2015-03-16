'use strict';
angular.module('RiotService',[])
	.factory('Riot',['$http',function($http){
		return {
			getSelf:function(){
				return $http.get('/api/riot/self');
			},
			getSelfRecent:function(){
				return $http.get('/api/riot/self/recent');
			},
			getSelfStats:function(){
				return $http.get('/api/riot/self/stats');
			},
			getSelfLeague:function(){
				return $http.get('/api/riot/self/league');
			},
			getMining:function(){
				return $http.get('/api/riot/self/mining');
			},
			getSummoner:function(region,summonerName){
				return $http.get('/api/riot/summoner?region='+region+'&name='+summonerName);
			},
			getSummonerMatchesByChampion:function(region,summonerid,championid){
				return $http.get('/api/riot?region='+region+'&lolid='+summonerid+'&champion='+championid);
			},
			getChampionsList:function(){
				return $http.get('/api/riot/champions/list');
			}
		};
	}]);