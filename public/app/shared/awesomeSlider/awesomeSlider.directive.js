(function() {
	'use strict';

	angular
	.module('awsSlider', ['awsRiot', 'templatesData'])
	.directive('awsSlider', awsSlider);

	/* @ngInject */
	function awsSlider ($animate, $timeout) {
	  // Usage:
	  //
	  // Creates:
	  //
	  var directive = {
	  	bindToController: true,
	  	controller: Controller,
	  	controllerAs: 'vm',
	  	link: link,
	  	restrict: 'E',
	  	scope: {
	  		templates: '=content'
	  	},
	  	templateUrl: 'app/shared/awesomeSlider/awesomeSlider.view.html'
	  };
	  return directive;

	  function link(scope, element, attrs) {

	  	var hoverItems = [];
			//set focus on template as sliderOptions.current
			scope.$watch('vm.sliderOptions.current', function(newValue, oldValue) {
				var templates=element[0].querySelectorAll('aws-template');
				[].forEach.call(templates, function(template, id) {
					if (id === newValue) {
						$animate.addClass(angular.element(template), 'templateOnFocus');
					} else {
						$animate.removeClass(angular.element(template), 'templateOnFocus');
					}
				});
			});
			//set sliderOptions.current based on mouseovered template
			scope.$on('awesomeTemplateEntered', function(event, templateId) {
				//every hover is pushed and after a timeout the last one is taken
				//timeout with false to remove it from $apply but with $digest() for performance
				hoverItems.push(templateId);
				$timeout(function() {
					if(hoverItems[hoverItems.length-1] === templateId) {
						hoverItems = [];
						scope.filteredTemplates.forEach(function(template, id) {
							if(template._id === templateId) {
								scope.vm.sliderOptions.current = id;
								scope.$digest();
							}
						});

					}
				}, 100, false);
			});

		}
	}

	/* @ngInject */
	function Controller ($scope, templatesData) {
		var vm = this;
		vm.deleteFunction = deleteFunction;
		vm.sliderOptions = new Slider();

		$scope.$watch('templates', function(newVal) {
			if(newVal.length > 0) {
				vm.sliderOptions.uniqueValues = newVal
				.map(function(template) { return template.champion || 'unset'; })
				.filter(function(champion, id, array) { return id === array.indexOf(champion); })
				.sort();
			}
		});

		function deleteFunction(template) {
			console.log('tried to delete ', template);
			if(template) {
				templatesData.deleteById(template._id)
				.success(function(data) {
					$scope.templates = data;
					vm.sliderOptions.current = -1;
				});
			}
		}

		function Slider() {
			this.filter = 'all';
			this.uniqueValues = [];
			this.current = -1;
		}
		Slider.prototype.setFilter = function(uniqueValue) {
			this.filter = uniqueValue;
			this.current = -1;
		};
		Slider.prototype.next = function() {
			this.current++;
		};
		Slider.prototype.previous = function() {
			this.current--;
		};

	}

})();
