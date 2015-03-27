'use strict';
var RiotUrl=require('../../config/riot.js');
var DM=require('../dataMining.js');
var request=require('request');
var async=require('async');


var LRU=require('lru-cache'),options={max:50,maxAge:1000},cache=LRU(options);

var rateBrocker={
	limit:10*1000,
	open:true,
	timeLocked:0,
	reset:function(){
		this.open=true;
		this.timeLocked=0;
	},
	timeTillOpen:function(){
		return this.limit-(Date.now()-this.timeLocked);
	}
};

function getResource(url,callback){

	function fromSource(){
		request(url,function(err,response,body){
			if(err || response.statusCode===404 || response.statusCode===503){
				callback('error');
			}else if(response.statusCode===429){

				if(rateBrocker.open){
					rateBrocker.open=false;
					rateBrocker.timeLocked=Date.now();
				}
				console.log('Should timeout with'+rateBrocker.timeTillOpen());

				setTimeout(function(){
					fromSource();
				},rateBrocker.timeTillOpen());
			}else{
				console.log('success');
				rateBrocker.reset();
				var info=JSON.parse(body);
				cache.set(url,info);
				callback(info);
			}
		});
	}

	if(cache.has(url)){
		console.log('getting data from cache');
		callback(cache.get(url));
	}else{
		console.log('gettng data from source');
		fromSource();
	}
}


var lastRequest=Date.now();


function addChamp(array,info){
	for(var i=0;i<array.length;i++){
		if(array[i].id===info.participants[0].championId){
			array[i].count+=1;
			array[i].kills+=info.participants[0].stats.kills;
			array[i].deaths+=info.participants[0].stats.deaths;
			array[i].assists+=info.participants[0].stats.assists;
			return;
		}
	}
	array[array.length]={id:info.participants[0].championId,count:1,
		kills:info.participants[0].stats.kills,
		deaths:info.participants[0].stats.deaths,
		assists:info.participants[0].stats.assists
	};
}


module.exports=function(router){
	router.route('/riot')
		.get(function(req,res){
			//OPTIONAL params... region,lolids,champion
			//returns item data from matches for certain champion played by given summoners
			console.log(req.query);
			//gets the first 3 queries
			var configMaxQueries=3;
			var lolids=req.query.lolid.split(',').splice(0,configMaxQueries);
			var regions=req.query.region.split(',').splice(0,configMaxQueries);

			var itemData=[];

			async.each(lolids,function(lolid,cbDerp){
				var region=regions[lolids.indexOf(lolid)];
				var url='https://'+region+'.api.pvp.net/api/lol/'+region+'/v2.2/matchhistory/'+lolid+'?championIds='+req.query.champion+'&api_key=7947d3bb-10c2-4fc3-b2b3-0805a2aa805f';				
				getResource(url,function(data){
					if(data==='error'){
						cbDerp('error fetching data for '+lolid);
					}else{
						if(!data.matches){
							console.log(lolid,' has no matches data for ',req.query.champion);
							cbDerp();
						}else{
							var itemsMatches=data.matches.map(function(el){
								return {
									player:el.participantIdentities[0].player,
									winner:el.participants[0].stats.winner,
									kills:el.participants[0].stats.kills,
									deaths:el.participants[0].stats.deaths,
									assists:el.participants[0].stats.assists,
									item0:el.participants[0].stats.item0,
									item1:el.participants[0].stats.item1,
									item2:el.participants[0].stats.item2,
									item3:el.participants[0].stats.item3,
									item4:el.participants[0].stats.item4,
									item5:el.participants[0].stats.item5,
									item6:el.participants[0].stats.item6
								};
							});
							itemData=itemData.concat(itemsMatches);
							cbDerp();
						}
					}
				});
			},function(err){
				if(err){
					res.status(404).send(err);	
				}else{
					res.status(200).send(itemData);	
				}

			});
			//end of async call

		});


//get self info with token data
	router.route('/riot/self')
		.get(function(req,res){
			var url=RiotUrl.getSummonerByName(req.user.riot.region,req.user.riot.lolacc);
			getResource(url,function(summonerInfo){
				console.log(summonerInfo);
				if(summonerInfo==='error'){
					res.status(404).send('error fetching self info');	
				}else{
					var accInfo=summonerInfo[Object.keys(summonerInfo)[0]];
					accInfo.local=req.user.local.name;
					accInfo.region=req.user.riot.region;

					var url=RiotUrl.getLeagueStatsEntry(req.user.riot.region,req.user.riot.lolid);
					getResource(url,function(leagueInfo){
						console.log(leagueInfo);
						if(leagueInfo==='error'){
							res.status(200).send(accInfo);	
						}else{
							accInfo.leagueInfo=leagueInfo[req.user.riot.lolid][0];
							res.status(200).send(accInfo);	
						}
					});
				}
			});
		});

	router.route('/riot/self/recent')
		.get(function(req,res){
			var url=RiotUrl.getGamesRecent(req.user.riot.region,req.user.riot.lolid);
			getResource(url,function(recentGames){
				if(recentGames==='error'){
					res.status(404).send('error fetching recent games data');
				}else{
					res.status(200).send(recentGames);
				}
			});
		});

	router.route('/riot/self/stats')
		.get(function(req,res){
			//returns 3 most played champions
			var url=RiotUrl.getStats(req.user.riot.region,req.user.riot.lolid);
			getResource(url,function(championStats){
				if(championStats==='error'){
					res.status(404).send('error fetching champion statistics');
				}else{
					var mostPlayed=championStats.champions.sort(function(a,b){ 
						 var playedA=a.stats.totalSessionsPlayed; 
						 var playedB=b.stats.totalSessionsPlayed; 
						 return playedB-playedA; 
						}).slice(0,4);
				res.status(200).send(mostPlayed);
				}
			});

		});

	router.route('/riot/self/league')
		.get(function(req,res){
			var url=RiotUrl.getLeagueStatsSame(req.user.riot.region,req.user.riot.lolid);
			getResource(url,function(userLeague){
				console.log(userLeague);
				if(userLeague==='error'){
					res.status(404).send({message:'No league info available'});
				}else{

					var players=userLeague[req.user.riot.lolid][0].entries;
					//removes inactive challengers and sorts descending order the ones with GOOD score- 66% win rate		
					var activePlayers=players.filter(function(el){
					   return (el.isInactive===false && el.wins/el.losses>2);
					}).sort(function(a,b){return b.leaguePoints-a.leaguePoints;});
					
					console.log('iterating through active players...');
					var gg=[].concat(activePlayers);
					var leagueMostPlayedChampions=[];
					
					async.each(gg,function(player,cb){
						var url=RiotUrl.getMatchHistory(req.user.riot.region,player.playerOrTeamId);
						getResource(url,function(userStats){
								userStats.matches.forEach(function(info){
									console.log(info.participants[0].championId + '. Winner: '+info.participants[0].stats.winner+'k: '+ info.participants[0].stats.kills+' d: '+info.participants[0].stats.deaths+' a: '+ info.participants[0].stats.assists);
									addChamp(leagueMostPlayedChampions,info);
								});
								cb();
							});
					},function(err){
						if(err)
							res.status(404).send({message:'some kind of error'});
						console.log(leagueMostPlayedChampions);
						res.status(200).send({players:activePlayers,champions:leagueMostPlayedChampions});
					});

				}
			});
		});

	router.route('/riot/self/mining')
		.get(function(req,res){
			console.log('gets the top10 challengers');
			var url1=RiotUrl.getChallengers(req.user.riot.region);
			var url2=RiotUrl.getLeagueStatsSame(req.user.riot.region,req.user.riot.lolid);

			var playersChampions=[];
			var playersBase=[];


			
			async.each([url1,url2],function(url,cbOne){
				getResource(url,function(league){
					if(league[req.user.riot.lolid]!==undefined)	league=league[req.user.riot.lolid][0];
					var leagueEntries=league.entries.filter(function(entry){
						return entry.isInactive===false;
						//return (entry.isInactive===false&&(league.tier==='CHALLENGER'?entry.wins/entry.losses>1.5:entry.wins/entry.losses<0.7));
					}).sort(function(a,b){
						return (league.tier==='CHALLENGER'?b.wins/b.losses-a.wins/a.losses:a.wins/a.losses-b.wins/b.losses);
						//return b.leaguePoints-a.leaguePoints;
					}).slice(0,10);
					playersBase=playersBase.concat(leagueEntries);
					console.log(leagueEntries);
					async.each(leagueEntries,function(entry,cbTwo){
						var url=RiotUrl.getStats(req.user.riot.region,entry.playerOrTeamId);
						getResource(url,function(stats){
							if(stats==='error'){
								console.log('Error with fetchin stats for players');
								cbTwo('error');
							}else{
								stats.champions.forEach(function(el){
									if(el.id===0){
										playersChampions.push({
											type:(league.tier==='CHALLENGER'?'good':'bad'),
											avgKills:el.stats.totalChampionKills/el.stats.totalSessionsPlayed,
											totalDeaths:el.stats.totalDeathsPerSession/el.stats.totalSessionsPlayed,
											totalAssists:el.stats.totalAssists/el.stats.totalSessionsPlayed,
										});
									}
								});
								cbTwo();
							}
						});
					},function(err){
						if(err){
							cbOne('error');
						}else{
							cbOne();	
						}
					});
				});
			},function(err){
				if(err)
					res.status(404).send({message:'some kind of error'});
				
				console.log(playersChampions);
				
				var miningClasses={
					good:new DM.mineClass(),
					bad:new DM.mineClass(),
					doTheMath:function(){
						this.good.calculateGaussianParameters();
						this.bad.calculateGaussianParameters();
					}
				};

				playersChampions.forEach(function(el){
					miningClasses[el.type].occurrences+=1;
					miningClasses[el.type].kills.dataSet.push(el.avgKills);
					miningClasses[el.type].deaths.dataSet.push(el.totalDeaths);
					miningClasses[el.type].assists.dataSet.push(el.totalAssists);
				});
				
				miningClasses.doTheMath();
				console.log(miningClasses);

				var me={};
				var url=RiotUrl.getStats(req.user.riot.region,req.user.riot.lolid);
				console.log(url);
				getResource(url,function(stats){
					stats.champions.forEach(function(el){
						if(el.id===0){
							me.kills=el.stats.totalChampionKills/el.stats.totalSessionsPlayed;
							me.deaths=el.stats.totalDeathsPerSession/el.stats.totalSessionsPlayed;
							me.assists=el.stats.totalAssists/el.stats.totalSessionsPlayed;
						}
					});

					DM.calculateAllProperties(me,miningClasses);
					DM.calculateChancesAllClasses(me,miningClasses);
					DM.calculateProbabilityAllClasses(me,miningClasses);

					var result=DM.getMostProbableClass(me,miningClasses);
					console.log(me);
					res.status(200).send({base:playersBase,data:playersChampions,miningData:miningClasses,probabilityMe:me,result:result});
				});


			});

		});


	router.route('/riot/champions/list')
		.get(function(req,res){
			var url=RiotUrl.getChampionList();
			getResource(url,function(championList){
				res.status(200).send(championList);
			});
		});

	//Fetches static data from DDragon
	router.route('/riot/staticdata')
		.get(function(req,res){
			var staticData={};
			//which of the endpoints to fetch
			var staticDataUrls=[
				//'http://ddragon.leagueoflegends.com/realms/na.json'
				RiotUrl.getStaticData.realmStatus
			];

			getResource(RiotUrl.getStaticData.realmStatus,function(fetchedData){
				if(fetchedData==='error'){
					res.status(404).send('failed to get realms status');
				}else{
					staticData.dataVersions=fetchedData.n;
					console.log(staticData.dataVersions.item);

					var staticDataUrls=[
						RiotUrl.getStaticData.items(staticData.dataVersions.item),
						RiotUrl.getStaticData.champions(staticData.dataVersions.champion)
					];
					console.log(staticDataUrls);
					
					async.each(staticDataUrls,function(url,fetchingDone){
						getResource(url, function(fetchedData){
							if(fetchedData==='error'){
								fetchingDone('failed to fetch some of the data');
							}else{
								staticData[fetchedData.type]=fetchedData.data;
								fetchingDone();
							}
						});
					},function(err){
						if(err){
							console.log('error fetchin data');
							res.status(404).send('failed to get some of the data');
						}else{
							res.status(200).send(staticData);
						}
					});
				}
			});
		});

	//checks summoner by NAME +region
	router.route('/riot/summoner')
		.get(function(req,res){
			var url=RiotUrl.getSummonerByName(req.query.region,req.query.name);
			getResource(url,function(summoner){
				if(summoner==='error'){
					res.status(404).send(summoner);
				}else{
					res.status(200).send(summoner);	
				}
			});
		});

	

};