'use strict';
angular.module('VisualDirectives',[])
.directive('backImg',function(){
		return function(scope,element,attrs){
			attrs.$observe('backImg',function(value){
				if(value!==''){
					element.css({
						'background-image':'url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/'+value+'_0.jpg)'
					});
				}
			});
		};
	})
	.directive('progressBar',function(){
		return function(scope,element,attrs){
			attrs.$observe('progressBar',function(value){
				console.log(value);
				element.css({
					'height':'100px',
					//'background':'red'
					'background': 'linear-gradient(to top, rgba(0,255,0,1) 0%,rgba(0,255,0,1) '+value+'%,rgba(255,0,0,1) '+value+'%,rgba(255,0,0,1) 100%)'
				});
			});
		};
	})
	.directive('gradientbar',function(){
		return{
			restrict:'EA',
			link:function(scope,element,attrs){
				var cP=attrs.colorPositive;
				var cN=attrs.colorNegative;
				attrs.$observe('percentagePositive',function(value){
					element.css({
					'height':'100px',
					'background': 'linear-gradient(to top, '+cP+' 0%,'+cP+' '+(value-1)+'%,'
															+'rgba(0,0,0,1) '+(value-1)+'%, rgba(0,0,0,1) '+(value-(-1))+'%, '
															+cN+' '+(value-(-1))+'%,'+cN+' 100%)',
					'border':'3px ridge #212121',
					});
				});
			}
		};
	});



