'use strict';
angular.module('awesomeSliderDirective',['RiotDirectives'])
	.directive('awesomeSlider',function($animate,$timeout){
		return {
			restrict:'E',
			scope:{
				templates:'=content'
			},
			controller:['$scope','TemplatesById',function($scope,TemplatesById){
				$scope.current=0;
				$scope.previousTemplate=function(){
					$scope.current--;
				};
				$scope.nextTemplate=function(){
					$scope.current++;
				};
				$scope.deleteFunction=function(template){
					console.log('deleting ',template);
					if(template){
						TemplatesById.delete(template._id)
							.success(function(data){
								$scope.templates=data;
							});
					}
				};
			}],
			link:function(scope,element,attrs){

				var hoverItems=[];

				scope.$watch('current',function(newValue){
					var templates=element[0].querySelectorAll('awesome-template');
					[].forEach.call(templates,function(template,id){
						if(id===newValue){
							$animate.addClass(angular.element(template),'templateOnFocus');
						}else{
							$animate.removeClass(angular.element(template),'templateOnFocus');
						}
					});
				});

				scope.$on('awesomeTemplateEntered',function(event,templateId){
					//every hover is pushed and after a timeout the last one is taken
					//timeout with false to remove it from $apply but with $digest() for performance
					hoverItems.push(templateId);
					$timeout(function(){
						if(hoverItems[hoverItems.length-1]===templateId){
							hoverItems=[];

							scope.templates.forEach(function(template,id){
								if(template._id===templateId){
									scope.current=id;
									scope.$digest();
								}
							});

						}
					},100,false);
				});

			},
			templateUrl:'app/shared/awesomeSlider/awesomeSliderView.html'
		};
	});