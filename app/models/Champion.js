'use strict';
var mongoose=require('mongoose');
var Champion=mongoose.model('Champion',{
	champion:{
		type:String,
		default:'champion name'
	},
	watchedPro:{
		lolid:String,
		region:String
	},
	itemBuild:{
		type:[],
		default:[0,0,0,0,0,0]
	},
	name:{
		type:String,
		default:'template name'
	},
	owner:{
		type:String,
		defaut:'created by user'
	}
});

module.exports=Champion;