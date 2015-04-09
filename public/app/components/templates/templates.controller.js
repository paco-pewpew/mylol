(function() {
    'use strict';

    angular
        .module('awesomeApp.templates',['visualDirectives','awsRiot','awsTemplate'])
        .controller('TemplateCtrl', TemplateCtrl);

    /* @ngInject */
    function TemplateCtrl($scope,resTemplate,resStaticData,templatesData,Riot,AdvancedBuild) {
        var vm = this;
        vm.templateResolved=resTemplate;
        //deep coppy for edit
        vm.templateNew=angular.copy(vm.templateResolved);
        //STATIC data
        vm.itemsData=resStaticData.item;
        vm.championList=resStaticData.championList;
		vm.championNames=Object.keys(vm.championList).map(function(el){return vm.championList[el];});
		var championData=resStaticData.champion[vm.templateResolved.champion];
		console.log(championData);
		//WATCHED
		vm.watchedBuilds=[];
		vm.getWatchedBuilds=getWatchedBuilds;
		vm.itemsWatchedBuilds=[];
		vm.removeWatched=removeWatched;
		vm.addWatched=addWatched;
		//BUILD
		vm.myBuild=new AdvancedBuild(resStaticData.item);
		console.log(vm.myBuild);
		vm.addToBuild=addToBuild;
		vm.removeFromBuild=removeFromBuild;
		//animation helpers
		vm.animateToggles={
			addItem:false,
			removeItem:false
		};
		//submit template
		vm.processTemplate=processTemplate;
        //STATUS of current   template based on info
        vm.templateStatus={
			championUnset:false,
			watchedProsUnset:false,
			set:false,
			setStatus:function(){
				this.championUnset=(vm.templateResolved.champion?false:true);
				this.watchedProsUnset=(vm.templateResolved.watchedPros.length>0?false:true);
				this.set=!(this.championUnset&&this.watchedProsUnset);
				return this.set;
			}
		};

		activate();

        ////////////////
       
        function activate() {
 			if(vm.templateStatus.setStatus()){
				vm.templateResolved.itemBuild=new AdvancedBuild(resStaticData.item,vm.templateResolved.itemBuild);
	        
	        	//deep coppy for edit
	        	vm.templateNew=angular.copy(vm.templateResolved);

	        	getWatchedBuilds();
			}
        }





		function removeWatched(index){
			vm.templateNew.watchedPros.splice(index,1);
		}

		function addWatched(result){
			if(result){
				vm.templateNew.watchedPros.push(result);
			}
		}


		function processTemplate(){
			vm.templateNew.itemBuild=(vm.myBuild.items?vm.myBuild.items:null);
				console.log(vm.templateNew);
			templatesData.updateById(vm.templateResolved._id,vm.templateNew)
				.success(function(data){
					console.log(data);
					vm.templateResolved=data;
					activate();
					vm.myBuild.redo();
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
			if(vm.myBuild.items.length<6){
				vm.itemsWatchedBuilds.splice(index,1);
				vm.myBuild.addItem(item);	
				vm.animateToggles.addItem=!vm.animateToggles.addItem;

			}
		}

		function removeFromBuild(item,index){
			vm.myBuild.removeItem(index);
			vm.itemsWatchedBuilds.push(item);
			vm.animateToggles.removeItem=!vm.animateToggles.removeItem;

		}

    }
})();
