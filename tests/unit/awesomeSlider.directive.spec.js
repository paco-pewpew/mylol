(function() {
  'use strict';

  describe('awesome slider', function() {
    var httpBackend, isoScope;

	//load modules
	beforeEach( module('awsSlider', 'awsTemplate', 'templatesData' ,'mockedFeed', 'served.templates'));
	//add mock Riot data;
	beforeEach( inject( function( $httpBackend, $rootScope, $compile, templatesInfo ) {
		httpBackend= $httpBackend;
		$httpBackend.whenGET('/api/champions').respond(templatesInfo);

		var scope=$rootScope.$new();
		var element=angular.element('<aws-slider><aws-slider>');
		element.attr('content',JSON.stringify(templatesInfo));
		element=$compile(element)(scope);
		scope.$digest();
		isoScope=element.isolateScope();
	}));

		it('has templates variable in its isolate scope containing the templates info',inject(function(templatesInfo) {
			expect(isoScope.templates).toEqual(templatesInfo);
		}));

		describe('contains sliderOptions object ',function() {

			it('that is defined',
				function() {
					expect(isoScope.vm.sliderOptions).toBeDefined();
				});

			it('has property current to hold the index of focused element',
				function() {
					expect(isoScope.vm.sliderOptions.current).toBeDefined();
					expect(isoScope.vm.sliderOptions.current).toEqual(-1);
				});

			it('has previous() and nex() methods to change current property',
			  function() {
			  	expect(isoScope.vm.sliderOptions.next).toBeDefined();
			  	isoScope.vm.sliderOptions.next();
					expect(isoScope.vm.sliderOptions.current).toBe(0);
					isoScope.vm.sliderOptions.previous();
					expect(isoScope.vm.sliderOptions.current).toBe(-1);
				});

			it('has property filter to be used for value for a foreign filter function',
				function() {
					expect(isoScope.vm.sliderOptions.filter).toBeDefined();
				});

			it('has a method setFilter() to change filter value and remove focus/ change current to default',
				function() {
					expect(isoScope.vm.sliderOptions.setFilter).toBeDefined();
					isoScope.vm.sliderOptions.setFilter('Zed');
					expect(isoScope.vm.sliderOptions.filter).toBe('Zed');
					expect(isoScope.vm.sliderOptions.current).toBe(-1);
				});

			it('has a property uniqueValues which holds array of the unique names of served templates',
				function() {
					expect(isoScope.vm.sliderOptions.uniqueValues).toBeDefined();
					var uniqueChamps=['Lissandra', 'Zed', 'unset'];
					expect(isoScope.vm.sliderOptions.uniqueValues).toEqual(uniqueChamps);
				});

		});

	});
})();
