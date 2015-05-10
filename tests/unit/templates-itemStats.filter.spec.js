'use strict';

describe('itemStats.filter',function(){

	var itemStats;

	 beforeEach(module('awesomeApp.templates'));

	 it('should have and item stats filter',
	 	inject(function(){}));

	 
	/* beforeEach(inject(function($injector){
	 	itemStats=$injector.get('itemStats');
	 }));*/
/*
	it('should have an item stats filter',
		inject(function($filter){
			expect($filter('itemStats')).toNotEqual(null);
		}));

	 it('Should output rewritten text of item\'s type stats',
	 	inject(function(itemStats){

	 	var RylaiStats={
	 		FlatHPPoolMod: 400,
			FlatMagicDamageMod: 100
		};

	 	expect(itemStats(RylaiStats).toBe({'H P':400,'Magic Damage':100}));

	 }));
*/
});