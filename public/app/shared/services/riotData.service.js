(function() {
  'use strict';

  angular
    .module('riotData',[])
    .factory('Riot', Riot);

  /* @ngInject */
  function Riot($http) {
    var service = {
      getSelf: getSelf,
      getSelfRecent: getSelfRecent,
      getSelfStats: getSelfStats,
      getSelfLeague: getSelfLeague,
      getMining: getMining,
      getSummoner: getSummoner,
      getSummonerMatchesByChampion: getSummonerMatchesByChampion,
      getChampionsList: getChampionsList,
      getStaticData: getStaticData
    };
    
    return service;

    ////////////////

    function getSelf() {
			return $http.get('/api/riot/self/info');
		}
		function getSelfRecent() {
			return $http.get('/api/riot/self/recent');
		}
		function getSelfStats() {
			return $http.get('/api/riot/self/stats');
		}
		function getSelfLeague() {
			return $http.get('/api/riot/self/league');
		}
		function getMining() {
			return $http.get('/api/riot/self/mining');
		}
		function getSummoner(region, summonerName) {
			return $http.get('/api/riot/summoner?region=' + region + '&name=' + summonerName);
		}
		function getSummonerMatchesByChampion(region, summonerid, championid) {
			return $http.get('/api/riot/champion-by-summoners?region=' + region + '&lolid=' + summonerid + '&champion=' + championid);
		}
		function getChampionsList() {
			return $http.get('/api/riot/champions/list');
		}
		function getStaticData() {
		 	return $http.get('/api/riot/staticdata');
		}
  }
})();
