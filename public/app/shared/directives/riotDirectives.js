'use strict';
angular.module('RiotDirectives',[])
	.directive('backImg',function(){
		return {
			restrict:'EA',
			link:function(scope,element,attrs){
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

		};

	})
	.directive('itemPic',function(){
		return {
			restrict:'EA',
			link:function(scope,element,attrs){
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
		}; 
	})
	.directive('championIconPic',function(){
		return {
			restrict:'EA',
			scope:{},
			link:function(scope,element,attrs){
				var img=new Image();
				scope.imgLoaded=false;

				attrs.$observe('championName',function(value){
					if(value && value!=='0'){
						scope.championName=value;
						img.src='http://ddragon.leagueoflegends.com/cdn/5.5.3/img/champion/'+value+'.png';
						//successful img
						img.addEventListener('load',function(){
							//console.log('champion icon loaded for ',value);
							scope.imgLoaded=true;
							element.css({
								'background-image':'url('+img.src+')',
								'background-color':'black'
							});
						});
						//not found(due to version or non existing champ)
						img.addEventListener('error',function(){
							console.log('champion icon for ',value,' not fount');
						});
					}else{	
						element.css({
							'background-color':'pink'
						});
					}

				});
			},
			template:'<i ng-show="{{imgLoaded}}" class="fa fa-spinner fa-pulse"></i><p id="champion-name">{{championName}}</p>'
		}; 
	})
	
	.directive('championLoadingPic',function(){
		return {
			restrict:'E',
			scope:{},
			link:function(scope,element,attrs){
				var img=new Image();
				scope.championName='';
				scope.imgLoaded=false;
				scope.imgError=false;

				attrs.$observe('championName',function(value){

					if(value && value!=='0'){
						scope.championName=value;
						img.src='http://ddragon.leagueoflegends.com/cdn/img/champion/loading/'+value+'_0.jpg';
						//img.src=STATIC_DATA.champLoadingPic(value);
						
						img.addEventListener('load',function(){
							scope.imgLoaded=true;
							scope.$digest();
							//console.log('champLoadingPic for ',value,' done');
							element.css({
								'background-image':'url('+img.src+')'
							});
						});

						img.addEventListener('error',function(){
							scope.imgLoaded=true;
							scope.imgError=true;
							scope.$digest();
							console.log('championLoadingPic for ',value,' not found. ERROR!' );

						});
						
					}else{
						element.addClass('carbon-texture');
					}

				});
			},
			template:'<i id="fetching" class="fa fa-spinner fa-pulse" ng-show="!imgLoaded&&championName"></i>'+
			'<i id="notFound" ng-show="imgLoaded&&imgError" class="fa fa-question"></i>'+
			'<p id="champion-name">{{championName}}</p>'
		}; 
	})

	.directive('profilePic',function(){
		return {
			restrict:'EA',
			link:function(scope,element,attrs){
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
		};
	})
	.constant('STATIC_DATA',{
		championLoadingPic:function(value){return 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/'+value+'_0.jpg}';},
		championIconPic:function(value){return 'url(http://ddragon.leagueoflegends.com/cdn/5.5.3/img/profileicon/'+value+'.png )';}
	});
