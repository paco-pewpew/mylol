(function() {
    'use strict';

    angular
        .module('awesomeApp.templates',['VisualDirectives','RiotDirectives','awesomeTemplate'])
        .controller('TemplateCtrl', TemplateCtrl);

    /* @ngInject */
    function TemplateCtrl($scope,resTemplate,resStaticData,templatesData,Riot) {
        var vm = this;
        vm.templateResolved=resTemplate;
        //deep coppy for edit
        vm.templateNew=angular.copy(vm.templateResolved);

        vm.itemsData=resStaticData.item;
        vm.championList=resStaticData.championList;
		vm.championNames=Object.keys(vm.championList).map(function(el){return vm.championList[el];});
		vm.watchedBuilds=[];
		vm.getWatchedBuilds=getWatchedBuilds;
		vm.itemsWatchedBuilds=[];
		vm.myBuild=[];
		var championData=resStaticData.champion[vm.templateResolved.champion];
		console.log(championData);
		///vm.templateStatus=templateStatus;

		vm.removeWatched=removeWatched;
		vm.addWatched=addWatched;
		vm.processTemplate=processTemplate;

		vm.addToBuild=addToBuild;
		vm.removeFromBuild=removeFromBuild;


        activate();

        ////////////////

        function activate() {
        	getWatchedBuilds();
        }


        vm.templateStatus={
			championUnset:false,
			watchedProsUnset:false,
			filled:false,
			setStatus:function(){
				this.championUnset=(vm.templateResolved.champion?false:true);
				this.watchedProsUnset=(vm.templateResolved.watchedPros.length>0?false:true);
				this.set=!(this.championUnset&&this.watchedProsUnset);
			}
		};
		$scope.$watch('vm.templateResolved',function(){
			vm.templateStatus.setStatus();

			if(vm.templateStatus.filled){
				vm.templateStats={movespeed:championData.stats.movespeed};
				['hp','mp','armor','spellblock','hpregen','mpregen','crit','attackdamage'].forEach(function(el){
					vm.templateStats[el]=championData.stats[el]+championData.stats[el+'perlevel']*18;
				});
			}

			

		});

		
		vm.animateToggles={
			addItem:false,
			removeItem:false
		};

		function removeWatched(index){
			vm.templateNew.watchedPros.splice(index,1);
		}

		function addWatched(result){
			if(result){
				vm.templateNew.watchedPros.push(result);
			}
		}


		function processTemplate(){
			vm.templateNew.itemBuild=(vm.myBuild?vm.myBuild:null);
			console.log(vm.templateNew);
			templatesData.updateById(vm.templateResolved._id,vm.templateNew)
				.success(function(data){
					console.log(data);
					vm.myBuild=[];
					vm.templateResolved=data;
					vm.getWatchedBuilds();
				})
				.error(function(data){
					console.log(data);
				});
		}

		function getWatchedBuilds(){
			var championId=Object.keys(vm.championList).filter(function(key){return vm.championList[key]===vm.templateNew.champion;});
			if(vm.templateNew.watchedPros.length>0 && championId){
				var watchedids=vm.templateNew.watchedPros.reduce(function(a,b){return a.concat((a.length?',':''),b.id);},'');
				var watchedregions=vm.templateNew.watchedPros.reduce(function(a,b){return a.concat((a.length?',':''),b.region);},'');
				console.log(watchedids,watchedregions,championId);
				//Riot.getSummonerMatchesByChampion(watched.region,watched.lolid,championId)
				Riot.getSummonerMatchesByChampion(watchedregions,watchedids,championId)
					.success(function(data){
						console.log(data);
						vm.watchedBuilds=data;
						vm.watchedBuilds.forEach(function(match){
							[0,1,2,3,4,5].forEach(function(slot){
								vm.itemsWatchedBuilds.push(match['item'+slot]);
							});
						});
						//filter unique
						vm.itemsWatchedBuilds=vm.itemsWatchedBuilds.filter(function(el,id,arr){
							return (arr.indexOf(el)===id && el!==0);
						});
						
					})
					.error(function(data){
						console.log('error fetching builds',data);
					});
			}
			
		}


		function addToBuild(item,index){
			if(vm.myBuild.length<6){
				vm.itemsWatchedBuilds.splice(index,1);
				vm.myBuild.push(item);	
				vm.animateToggles.addItem=!vm.animateToggles.addItem;
			}
		}

		function removeFromBuild(item,index){
			vm.myBuild.splice(index,1);
			vm.itemsWatchedBuilds.push(item);
			vm.animateToggles.removeItem=!vm.animateToggles.removeItem;
		}

    }
})();
