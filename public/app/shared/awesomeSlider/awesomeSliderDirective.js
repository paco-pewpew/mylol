'use strict';
angular.module('awesomeSliderDirective',['RiotDirectives'])
	.directive('awesomeSlider',function($animate,$timeout){
		return {
			restrict:'E',
			scope:{
				templates:'=content'
			},
			controller:['$scope','TemplatesById',function($scope,TemplatesById){
				$scope.sliderOptions={
					filter:'all',
					uniqueValues:[],
					current:-1,
					setFilter:function(uniqueValue){
						this.filter=uniqueValue;
						this.current=-1;
					}
				};
				$scope.tempChamps;
				$scope.$watch('templates',function(newVal){
					if(newVal.length>0){
						console.log(newVal);
						$scope.sliderOptions.uniqueValues=newVal.map(function(template){return template.champion||'unset';})
												.filter(function(champion,id,array){return id===array.indexOf(champion)})
												.sort();
						console.log($scope.sliderOptions.uniqueValues);
					}
				});
				$scope.previousTemplate=function(){
					$scope.sliderOptions.current--;
				};
				$scope.nextTemplate=function(){
					$scope.sliderOptions.current++;
				};
				$scope.deleteFunction=function(template){
					console.log('deleting ',template);
					if(template){
						TemplatesById.delete(template._id)
							.success(function(data){
								$scope.templates=data;
								$scope.sliderOptions.current=0;
							});
					}
				};
			}],
			link:function(scope,element,attrs){
				var hoverItems=[];
				//set focus on template as sliderOptions.current
				scope.$watch('sliderOptions.current',function(newValue,oldValue){
					var templates=element[0].querySelectorAll('awesome-template');
					[].forEach.call(templates,function(template,id){
						if(id===newValue){
							$animate.addClass(angular.element(template),'templateOnFocus');
						}else{
							$animate.removeClass(angular.element(template),'templateOnFocus');
						}
					});
				});
				//set sliderOptions.current based on mouseovered template
				/*scope.$on('awesomeTemplateEntered',function(event,templateId){
					//every hover is pushed and after a timeout the last one is taken
					//timeout with false to remove it from $apply but with $digest() for performance
					hoverItems.push(templateId);
					$timeout(function(){
						if(hoverItems[hoverItems.length-1]===templateId){
							hoverItems=[];

							scope.filteredTemplates.forEach(function(template,id){
								if(template._id===templateId){
									scope.sliderOptions.current=id;
									scope.$digest();
								}
							});

						}
					},100,false);
				});*/

			},
			templateUrl:'app/shared/awesomeSlider/awesomeSliderView.html'
		};
	})
	.filter('filterByChampion',function(){
		return function(templates,championCriteria){
			var pattern;
			switch(championCriteria){
				case'unset':
					pattern=/undefined/;
					break;
				case'all':
					pattern=/.*?/;
					break;
				default:
					pattern=new RegExp(championCriteria);
			}

			return (templates.length>0?templates.filter(function(template){
				//return template.champion===championCriteria;
				return pattern.test(template.champion);
			}):'');
		};
	});