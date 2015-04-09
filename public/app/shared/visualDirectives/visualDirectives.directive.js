(function() {
    'use strict';

    angular
        .module('visualDirectives',[])
        .directive('gradientbar', gradientbar)
        .directive('errorbox', errorbox)
        .directive('animateAttention', animateAttention)
        .directive('backImg', backImg);

    /* @ngInject */
    function gradientbar () {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
            	positiveValue:'@',
				negativeValue:'@'
            },
            template:'<span>{{positiveValue}}</span><span>{{negativeValue}}</span>'
        };
        return directive;

        function link(scope, element, attrs) {
        	var cP=attrs.colorPositive;
			var cN=attrs.colorNegative;
			scope.$watch('positiveValue+negativeValue',function(){
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
        }
    }


    /* @ngInject */
    function errorbox () {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            scope: {
            	errormessage:'@message',
				fetchFunction:'&'
            },
            template:'<i class="fa fa-bug"> {{errormessage}}</i><i class="fa fa-repeat" ng-click="fetchFunction()"></i>'
        };
        return directive;
    }


     /* @ngInject */
    function animateAttention ($animate) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
        };
        return directive;

        function link(scope, element, attrs) {
        	attrs.$observe('animateAttention',function(){
				$animate.addClass(element,'attention',function(){
					$animate.removeClass(element,'attention');
				});
			});
        }
    }

    /* @ngInject */
    function backImg () {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'EA',
        };
        return directive;

        function link(scope, element, attrs) {
        	var img=new Image();
			attrs.$observe('backImg',function(value){
				if(value!==''){
					img.src='http://ddragon.leagueoflegends.com/cdn/img/champion/splash/'+value+'_0.jpg';
					img.addEventListener('load',function(){
						//console.log('bg img loaded');
						element.css({
							'background-image':'url('+img.src+')'
						});
					});
					img.addEventListener('error',function(){
						console.log('bg img error in loading');
					});
				}
			});
        }
    }
})();