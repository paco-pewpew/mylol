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
							console.log('bg img loaded');
							element.css({
								'background-image':'url('+img.src+')'
							});
						});
						img.addEventListener('error',function(){
							console.log('bg img error in loading');
						});
					}
				});

				scope.loading = true;

	            function stopLoading(){
	                scope.loading = false;
	                scope.$digest();
	            }
	            console.log(element.children());
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
							'background-image':'url(http://ddragon.leagueoflegends.com/cdn/5.2.1/img/item/'+value+'.png)'


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
			link:function(scope,element,attrs){
				attrs.$observe('championName',function(value){
					if(value && value!=='0'){
						element.css({
							'background-image':'url(http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/'+value+'.png)'
						});
					}else{	
						//element.addClass('carbon-texture');
						element.css({
							'background-color':'pink'
						});
					}

				});
			}
		}; 
	})
	
	.directive('championLoadingPic',function(){
		return {
			restrict:'EA',
			link:function(scope,element,attrs){
				attrs.$observe('championName',function(value){
					if(value && value!=='0'){
						element.css({
							'background-image':'url(http://ddragon.leagueoflegends.com/cdn/img/champion/loading/'+value+'_0.jpg)'
						
						});
					}else{	
						element.css({
							'background-color':'pink'
						});
					}

				});
			}
		}; 
	})

	.directive('profilePic',function(){
		return {
			restrict:'EA',
			link:function(scope,element,attrs){
				attrs.$observe('id',function(value){
					if(value!=='' && value!=='0'){
						element.css({
							'background-image':'url(http://ddragon.leagueoflegends.com/cdn/5.2.1/img/profileicon/'+value+'.png )'
						});
					}else{
						element.css({
							'background-image':'url(assets/img/favicon.png)'
						});
					}
				});
			}
		};
	});



