(function() {
	'use strict';

	describe('FrontpageCtrl', function() {
		var scope, controller, httpBackend;

		beforeEach(module('awesomeApp.frontpage', 'templatesData', 'mockedFeed'));
		beforeEach(inject( function($rootScope, $controller, $httpBackend, templatesInfo) {
			httpBackend = $httpBackend;
			$httpBackend.whenGET('/api/champions').respond(templatesInfo);
			
			scope = $rootScope.$new();
			controller = $controller('FrontpageCtrl', { $scope: scope });


		}));

		it('should have a "templates" variable to hold data ', function() {
			expect(controller.templates).toBeDefined();
		});

		it('should call function to immediately populate the "templates" variable', (inject(function(templatesInfo) {
			httpBackend.flush();
			expect(controller.templates).toEqual(templatesInfo);
		})));

		it('should have a function "createTemplate" to create new templates ', (inject(function(templatesInfo) {
			var newTemplate = { name: 'ggeasy', owner: 'testUser' };
			var updatedTemplatesInfo = [].concat(templatesInfo);
			updatedTemplatesInfo.push(newTemplate);
			httpBackend.whenPOST('/api/champions').respond(updatedTemplatesInfo);

			controller.formData = newTemplate;
			expect(controller.createTemplate).toBeDefined();
			controller.createTemplate();
			httpBackend.flush();
			expect(controller.templates).toEqual(updatedTemplatesInfo);
		})));



	});

})();