(function() {
    'use strict';

    angular
        .module('awsRiot',[])
        .directive('awsRiot',awsRiot)
        .value('riotStatic',{
            'champion-loading-pic':function(value){
                return 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/'+value+'_0.jpg';
            },
            'champion-icon-pic':function(value){
                return 'http://ddragon.leagueoflegends.com/cdn/5.5.3/img/champion/'+value+'.png';
            },
            'profile-icon-pic':function(value){
                return 'http://ddragon.leagueoflegends.com/cdn/5.5.3/img/profileicon/'+value+'.png';
            },
            'item-pic':function(value){
                return 'http://ddragon.leagueoflegends.com/cdn/5.5.3/img/item/'+value+'.png';
            }
        });

    /* @ngInject */
    function awsRiot (riotStatic) {
        // Usage: to display static data for riot's league of legends game; Img for champions, account, items
        //
        // Creates: Element with bg img by given type(value from riotStatic urls) and name as el attrs;
        //
        var directive = {
            link: link,
            restrict: 'E',
            template:'<i id="fetching" class="fa fa-spinner fa-pulse" ng-show="!imgLoaded&&name"></i>'+
			'<i id="notFound" ng-show="imgLoaded&&imgError" class="fa fa-question"></i>'+
			'<p id="name">{{name}}</p>'

        };
        return directive;

        function link(scope, element, attrs) {
        	var img=new Image();
			scope.name='';
			scope.imgLoaded=false;
			scope.imgError=false;

			attrs.$observe('name',function(value){

				if(value && value!=='0'){
					scope.name=value;
                    //img is based on type of static data
                    img.src=riotStatic[attrs.type](value);
					
					img.addEventListener('load',function(){
						scope.imgLoaded=true;
						scope.$digest();
						element.css({
							'background-image':'url('+img.src+')',
							'background-size':'contain'
						});
					});

					img.addEventListener('error',function(){
						scope.imgLoaded=true;
						scope.imgError=true;
						scope.$digest();
					});
					
				}else{
					element.addClass('carbon-texture');
				}

			});
        }
    }


})();
