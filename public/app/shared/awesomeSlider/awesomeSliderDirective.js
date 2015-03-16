'use strict';
angular.module('awesomeSliderDirective',['RiotDirectives'])
	.directive('awesomeSlider',function(){
		return {
			restrict:'E',
			templateUrl:'app/shared/awesomeSlider/awesomeSliderView.html',
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