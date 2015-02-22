(function(){
	'use strict';
	var riotApiKey='your-api-key';
	var rateTenMinutes=500;
	var rateTenSeconds=10;

	module.exports={
		key:riotApiKey,
		rate:rateTenSeconds,
		getChampionList:function(){
			return 'https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?api_key='+riotApiKey;
		},
		getSummonerByName:function(region,name){
			return 'https://'+region+'.api.pvp.net/api/lol/'+region+'/v1.4/summoner/by-name/'+name+'?api_key='+riotApiKey;
		},
		getLeagueStatsEntry:function(region,id){
			return 'https://'+region+'.api.pvp.net/api/lol/'+region+'/v2.5/league/by-summoner/'+id+'/entry?api_key='+riotApiKey;
		},
		getLeagueStatsSame:function(region,id){
			return 'https://'+region+'.api.pvp.net/api/lol/'+region+'/v2.5/league/by-summoner/'+id+'?api_key='+riotApiKey;
		},
		getGamesRecent:function(region,id){
			return 'https://'+region+'.api.pvp.net/api/lol/'+region+'/v1.3/game/by-summoner/'+id+'/recent?api_key='+riotApiKey;
		},
		getMatchHistory:function(region,id){
			return 'https://'+region+'.api.pvp.net/api/lol/'+region+'/v2.2/matchhistory/'+id+'?rankedQueues=RANKED_SOLO_5x5&beginIndex=0&endIndex=15&api_key='+riotApiKey;
			//return 'https://euw.api.pvp.net/api/lol/'+region+'/v2.2/matchhistory/'+id+'?rankedQueues=RANKED_SOLO_5x5&api_key='+riotApiKey;
		},
		getStats:function(region,id){
			return 'https://'+region+'.api.pvp.net/api/lol/'+region+'/v1.3/stats/by-summoner/'+id+'/ranked?season=SEASON2015&api_key='+riotApiKey;
		},
		getChallengers:function(region){
			return 'https://'+region+'.api.pvp.net/api/lol/'+region+'/v2.5/league/challenger?type=RANKED_SOLO_5x5&api_key='+riotApiKey;
		}

	};	
})();
