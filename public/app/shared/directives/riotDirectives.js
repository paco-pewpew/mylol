(function() {
    'use strict';

    angular
        .module('RiotDirectives',[])
        .directive('backImg', backImg)
        .directive('itemPic',itemPic)
        .directive('championIconPic',championIconPic)
        .directive('championLoadingPic',championLoadingPic)
        .directive('profilePic',profilePic);

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


     /* @ngInject */
    function itemPic () {
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
        	attrs.$observe('id',function(value){
				if(value!=='' && value!=='0'){
					element.css({
						'background-image':'url(http://ddragon.leagueoflegends.com/cdn/5.5.3/img/item/'+value+'.png)'
					});
				}else{	
					element.addClass('carbon-texture');
				}

			});
        }
    }


    /* @ngInject */
    function championIconPic () {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'EA',
            template:'<i ng-show="{{imgLoaded}}" class="fa fa-spinner fa-pulse"></i><p id="champion-name">{{championName}}</p>'
        };
        return directive;

        function link(scope, element, attrs) {
        	var img=new Image();
			scope.imgLoaded=false;

			attrs.$observe('championName',function(value){
				if(value && value!=='0'){
					scope.championName=value;
					img.src='http://ddragon.leagueoflegends.com/cdn/5.5.3/img/champion/'+value+'.png';
					img.addEventListener('load',function(){
						scope.imgLoaded=true;
						element.css({
							'background-image':'url('+img.src+')',
							'background-color':'black'
						});
					});
					img.addEventListener('error',function(){
						console.log('champion icon for ',value,' not fount');
					});
				}else{	
					element.css({
						'background-color':'pink'
					});
				}

			});
        }
    }


    /* @ngInject */
    function championLoadingPic () {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'E',
            template:'<i id="fetching" class="fa fa-spinner fa-pulse" ng-show="!imgLoaded&&championName"></i>'+
			'<i id="notFound" ng-show="imgLoaded&&imgError" class="fa fa-question"></i>'+
			'<p id="champion-name">{{championName}}</p>'

        };
        return directive;

        function link(scope, element, attrs) {
        	var img=new Image();
			scope.championName='';
			scope.imgLoaded=false;
			scope.imgError=false;

			attrs.$observe('championName',function(value){

				if(value && value!=='0'){
					scope.championName=value;
					img.src='http://ddragon.leagueoflegends.com/cdn/img/champion/loading/'+value+'_0.jpg';
					
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


    /* @ngInject */
    function profilePic () {
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
        	attrs.$observe('id',function(value){
				if(value!=='' && value!=='0'){
					element.css({
						'background-image':'url(http://ddragon.leagueoflegends.com/cdn/5.5.3/img/profileicon/'+value+'.png )'
					});
				}else{
					element.css({
						'background-image':'url(assets/img/favicon.png)'
					});
				}
			});
        }
    }

})();
