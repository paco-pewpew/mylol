'use strict';

describe('aweseome snippet', function() {

	//load module
	beforeEach(module('awsSnippet', 'riotData', 'mockedFeed', 'served.templates'));
	var httpBackend, Riot;

	// Add mock Riot data
	beforeEach(inject(function($httpBackend, zeductiveInfo) {
	  httpBackend = $httpBackend;
	  $httpBackend.whenGET('/api/riot/summoner?region=euw&name=zeductive').respond(zeductiveInfo);
	}));

	describe('without set summoner', function() {
		var isoScope;

		//create directive element WITHOUT summoner attribute
		beforeEach(inject(function($rootScope, $compile) {
			var scope = $rootScope.$new();
			var element = $compile(angular.element('<aws-snippet></aws-snippet>'))(scope);
			scope.$digest();
			isoScope = element.isolateScope();
		}));

		it('should NOT have a set summoner: result', function() {
			expect(isoScope.vm.result).toBe('');
		});

		it('should instantate form with field region:euw and empty name field', function() {
			expect(isoScope.vm.searchForm.region).toEqual('euw');
			expect(isoScope.vm.searchForm.name).toBeUndefined();
		});

		it('should be able to search for Riot summoner info based on name and region and set it as a result', function() {
			isoScope.vm.searchForm.region = 'euw';
			isoScope.vm.searchForm.name = 'zeductive';

			isoScope.vm.checkAccount();
			httpBackend.flush();
			expect(isoScope.vm.result.id).toEqual(58560700);
		});

	});

	describe('with a set summoner attribute', function() {
		var element, isoScope;

		//create directive element WITH summoner attribute
		beforeEach(inject(function($rootScope, $compile, zeductiveInfo) {
			var scope = $rootScope.$new();
			element = angular.element('<aws-snippet></aws-snippet>');
			element.attr('summoner',JSON.stringify(zeductiveInfo));
			element = $compile(element)(scope);
			scope.$digest();
			isoScope = element.isolateScope();
		}));

		it('should have a variable result set to the summoner value', inject(function(zeductiveInfo) {
			expect(isoScope.vm.result).toEqual(zeductiveInfo);
		}));
		
	});

});