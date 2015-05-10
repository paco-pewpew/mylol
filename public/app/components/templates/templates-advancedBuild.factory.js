(function() {
    'use strict';

    angular
        .module('awesomeApp.templates')
        .factory('AdvancedBuild', AdvancedBuild);

    /* @ngInject */
    function AdvancedBuild() {
        

        ////////////////

        function AdvBuild(itemsData,itemBuildArr){
			this.items=itemBuildArr||[];
			this.flatStatsAll={};
			this.totalGold=0;
			
			var iData=itemsData;
			this.getItemsData=function(){
				return iData;
			};
			this.calculateFlatStats();
			this.calculateTotalGold();
		}
		AdvBuild.prototype.addItem=function(itemKey){
			this.items.push(itemKey);
			this.calculateFlatStats();
			this.calculateTotalGold();
		};
		AdvBuild.prototype.removeItem=function(index){
			this.items.splice(index,1);
			this.calculateFlatStats();
			this.calculateTotalGold();
		};
		AdvBuild.prototype.calculateFlatStats=function(){
			var advBuild=this;
			advBuild.flatStatsAll={};
			try{
				advBuild.items.forEach(function(item){
					Object.keys(advBuild.getItemsData()[item].stats).forEach(function(stat){
						advBuild.flatStatsAll[stat]=advBuild.flatStatsAll[stat]?advBuild.flatStatsAll[stat]+advBuild.getItemsData()[item].stats[stat]:advBuild.getItemsData()[item].stats[stat];
					});
				});
			}catch(err){
				console.log(err);
				//display err msg for stats?
			}
		};
		AdvBuild.prototype.calculateTotalGold=function(){
			var advBuild=this;
			try{
				advBuild.totalGold=advBuild.items.reduce(function(gold,item){
					return gold+advBuild.getItemsData()[item].gold.total;
				},0);
			}catch(err){
				console.log(err);
				//display err msg for gold?
			}
		};
		AdvBuild.prototype.redo=function(){
			this.items=[];
			this.flatStatsAll={};
			this.totalGold=0;
		};


		return (AdvBuild);
    }
})();