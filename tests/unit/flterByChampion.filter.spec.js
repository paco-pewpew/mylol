(function(){
	'use strict';

	describe('filterByChampion filter', function() {

		beforeEach(module('awsSlider','mockedFeed'));

		it('should have a champion filter', inject(function($filter) {
			expect($filter('filterByChampion')).toBeDefined();
		}));

		it('should return only the templates for given name of champion', inject(function($filter,templatesInfo){
			function isZedTemplate(template){
				return template.champion === 'Zed';
			}

			var champFilter = $filter('filterByChampion')(templatesInfo, 'Zed');

			expect(champFilter.every(isZedTemplate)).toBeTruthy();
		}));

		it('should return templates without set champion if criteria is "unset" ', inject(function($filter, templatesInfo){
			var champFilter = $filter('filterByChampion')(templatesInfo, 'unset');
			expect(champFilter.length).toBe(1);
		}));

		it('should return all templates if criteria is "all" ', inject(function($filter, templatesInfo){
			var champFilter = $filter('filterByChampion')(templatesInfo, 'all');
			expect(champFilter).toEqual(templatesInfo);
		}));

	});

})();