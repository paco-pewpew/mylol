'use strict';
angular.module('awesomeSliderDirective',['RiotDirectives'])
	.directive('awesomeSlider',function($animate){
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
				scope.$watch('current',function(newValue){
					var templates=element[0].querySelectorAll('awesome-template');
					console.log(templates);

					[].forEach.call(templates,function(template,id){
						if(id===newValue){
							$animate.addClass(angular.element(template),'templateOnFocus');
						}else{
							$animate.removeClass(angular.element(template),'templateOnFocus');
						}
					});
					

				});

			},
			templateUrl:'app/shared/awesomeSlider/awesomeSliderView.html'
		};
	});