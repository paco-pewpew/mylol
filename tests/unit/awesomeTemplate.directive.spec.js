(function(){
	'use strict';

	describe('awesomeTemplate directive ', function() {
		var scope, element, isoScope;

		//load modules
		beforeEach(module('awsTemplate', 'mockedFeed', 'served.templates'));
		//buiild directive
		beforeEach(inject(function($rootScope, $compile, templatesInfo) {
			scope = $rootScope.$new();
			element = angular.element('<aws-template></aws-template>');
			element.attr('template', JSON.stringify(templatesInfo[0]));
			element.attr('deleteFunction', function(){return 'fake';});
			element = $compile(element)(scope);
			scope.$digest();
			isoScope=element.isolateScope();
		}));

		it('can be given "template" attribute which is bound to template variable in isolate scope ', function() {
			expect(element.attr('template')).toBeDefined();
			expect(isoScope.template).toBeDefined();
			expect(element.attr('template')).toEqual(JSON.stringify(isoScope.template));
		});

		it('can be given "deleteFunction" attribute which is bound to variable in local scope', function() {
			expect(element.attr('deleteFunction')).toBeDefined();
			expect(isoScope.deleteFunction).toBeDefined();
		});

	});
})();