(function() {
    'use strict';

    angular
        .module('awesomeApp.templates')
        .filter('itemStats', itemStats);

    function itemStats() {
        return itemStatsFilter;

        ////////////////
        function itemStatsFilter(itemObj) {
            try{
                var renamedObj=Object.keys(itemObj).forEach(function(property){
                        var renamed=property.match(/(?![Flat]).*(?=Mod)/)[0].split(/(?=[A-Z])/).join(' ');
                        itemObj[renamed]=itemObj[property];
                        delete itemObj[property];
                    });

                    return renamedObj;
            }catch(err){
                return itemObj;
            }
        }
    }

})();