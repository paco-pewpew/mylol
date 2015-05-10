(function() {
	'use strict';

	describe('FormCtrl controller', function() {
		var scope, controller, httpBackend;

		beforeEach(module('awesomeApp.account', 'awsSnippet', 'riotData', 'usersData', 'ui.router'));
		beforeEach(inject(function($rootScope, $controller, $httpBackend) {
			httpBackend = $httpBackend;

			scope = $rootScope.$new();
			controller = $controller('FormCtrl', { $scope: scope });
		}));

		it('should have help functions', function() {
			dump('FormCtrl');
			dump(controller);
		});

		it('should have working login form', function() {
			expect(controller.loginForm).toBeDefined();
			expect(controller.processLoginForm).toBeDefined();
		});

		it('should have a working signup form', function() {
			expect(controller.signupForm).toBeDefined();
			expect(controller.processSignupForm).toBeDefined();
		});

	});	
	
})();



