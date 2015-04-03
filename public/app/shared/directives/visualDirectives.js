'use strict';
angular.module('VisualDirectives',[])
	//returns horizontal(if attr==true)/vertical gradient with 2 colors given as attr and scale equal to given percentage
	.directive('gradientbar',function(){
		return{
			restrict:'EA',
			scope:{
				positiveValue:'@',
				negativeValue:'@'
			},
			link:function(scope,element,attrs){
				var cP=attrs.colorPositive;
				var cN=attrs.colorNegative;
				
				scope.$watch('positiveValue+negativeValue',function(newVal){
					var vP=Number(scope.positiveValue);
					var vN=Number(scope.negativeValue);
					var percentage=Math.round(100*vP/(vP+vN));
					element.css({
					'background': 'linear-gradient('+((attrs.horizontal)?'to right':'to top')+', black 0%,'+cP+' '+(percentage-1)+'%,'+
															'rgba(0,0,0,1) '+(percentage-1)+'%, rgba(0,0,0,1) '+(percentage-(-1))+'%, '+
															cN+' '+(percentage-(-1))+'%, black 100%)',
					'border':'3px ridge #212121',
					'box-shadow': 'rgb(123, 242, 248) 0px 0px 6px 0px inset'
					});		
				});
				
			},
			template:'<span>{{positiveValue}}</span><span>{{negativeValue}}</span>'
		};
	})
	.directive('awesomeErrorbox',function(){
		return{	
			restrict:'E',
			scope:{
				errormessage:'@message',
				fetchFunction:'&'
			},
			template:'<i class="fa fa-bug"> {{errormessage}}</i><i class="fa fa-repeat" ng-click="fetchFunction()"></i>'
		};
	})
	.directive('animate',function($timeout,$animate){
		return{
			restrict:'A',
			link:function(scope,element,attrs){
				attrs.$observe('animate',function(val){
					$animate.addClass(element,'attention',function(){
						$animate.removeClass(element,'attention');
					});
				});
			}
		};
	});



