'use strict';
angular.module('RiotDirectives',[])
.directive('itemPic',function(){
		return function(scope,element,attrs){
			attrs.$observe('id',function(value){

				if(value!=='' && value!=='0'){
					element.css({
						'background-image':'url(http://ddragon.leagueoflegends.com/cdn/5.2.1/img/item/'+value+'.png)'
					});
				}else{	
					element.css({
						'background':'blue'
					});
				}

			});
		};
	});



