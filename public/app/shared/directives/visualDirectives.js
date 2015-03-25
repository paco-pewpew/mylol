'use strict';
angular.module('VisualDirectives',[])
	//returns horizontal(if attr==true)/vertical gradient with 2 colors given as attr and scale equal to given percentage
	.directive('gradientbar',function(){
		return{
			restrict:'EA',
			link:function(scope,element,attrs){
				var cP=attrs.colorPositive;
				var cN=attrs.colorNegative;
				attrs.$observe('percentagePositive',function(value){
					element.css({
					/*'background': 'linear-gradient('+((attrs.horizontal)?'to right':'to top')+', '+cP+' 0%,'+cP+' '+(value-1)+'%,'+
															'rgba(0,0,0,1) '+(value-1)+'%, rgba(0,0,0,1) '+(value-(-1))+'%, '+
															cN+' '+(value-(-1))+'%,'+cN+' 100%)',*/
					'background': 'linear-gradient('+((attrs.horizontal)?'to right':'to top')+', black 0%,'+cP+' '+(value-1)+'%,'+
															'rgba(0,0,0,1) '+(value-1)+'%, rgba(0,0,0,1) '+(value-(-1))+'%, '+
															cN+' '+(value-(-1))+'%, black 100%)',
					'border':'3px ridge #212121',
					'box-shadow': 'rgb(123, 242, 248) 0px 0px 6px 0px inset'
					});
				});
			}
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
		}
	});



