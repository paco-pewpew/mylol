(function() {
    'use strict';

    angular
        .module('awsSlider')
        .filter('filterByChampion', filterByChampion);

    function filterByChampion() {
        return filterByChampionFilter;

        ////////////////
        function filterByChampionFilter(templates,championCriteria) {
            var pattern;
            switch(championCriteria){
                case'unset':
                    pattern=/undefined/;
                    break;
                case'all':
                    pattern=/.*?/;
                    break;
                default:
                    pattern=new RegExp(championCriteria);
            }

            return (templates.length>0?templates.filter(function(template){
                return pattern.test(template.champion);
            }):'');
        }
    }

})();