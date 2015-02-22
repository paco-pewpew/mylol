'use strict';
angular.module('CentralController',[])
	.controller('CentralCtrl',['$scope','$http','$window','Champions','ChampionById',function($scope,$http,$window,Champions,ChampionById){
		$scope.championList=JSON.parse($window.sessionStorage.championList);
		$scope.formData={};

		Champions.get()
			.success(function(data){
				$scope.templates=data;
			});

		$scope.deleteChamp=function(id){
			ChampionById.delete(id)
				.success(function(data){
					$scope.templates=data;
				});
		};

		$scope.createChamp=function(){
			Champions.post($scope.formData)
				.success(function(data){
					$scope.templates=data;
					$scope.formData={};
				});		
		};

		$scope.derp=function(event){
			console.log(event);
		};
	}])
	.filter('limitFont',function(){
		return function(input,limit){
			if(input.length>limit){
				return input.slice(0,limit).concat('...');	
			}else{
				return input;
			}
		};
	})

	.directive('awesomeSlider',function(){
		return {
			restrict:'E',
			templateUrl:'views/home-partials-templateSlide.html',
			controller:['$scope',function($scope){
				$scope.current=0;
				$scope.previousTemplate=function(){
					$scope.current--;
				};
				$scope.nextTemplate=function(){
					$scope.current++;
				};
			}],
			link:function(scope,element,attrs){
				scope.$watch('current',function(newValue){
					var templates=element[0].querySelectorAll('.awesome-template');
					console.log(templates);

					[].forEach.call(templates,function(template,id){
						if(id<newValue){
							template.style.transform='perspective(500px) rotateY(50deg) translate(50px,0px)';
							template.style.marginLeft='-50px';
							template.style.marginRight='';
							template.style.zIndex=id;
						}else if(id>newValue){
							template.style.transform='perspective(500px) rotateY(50deg) translate(50px,0px)';
							template.style.marginLeft='-50px';
							template.style.marginRight='';
						}else{
							template.style.transform='';
							template.style.marginLeft='50px';
							template.style.marginRight='50px';
							template.style.zIndex=-id;
						}
					});	


					

				});

			}
		};
	});