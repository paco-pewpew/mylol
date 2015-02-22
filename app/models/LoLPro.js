'use strict';
var mongoose=require('mongoose');

var LoLProSchema=mongoose.Schema({
	riot:{
		lolid:String,
		lolacc:String,
		region:String
	},
	stats:{
		winPercentage:String,
		wins:String,
		losses:String,
		league:{
			tier:String,
			division:String
		}
	}
});

var LoLPro=mongoose.model('LoLPro',LoLProSchema);
module.exports = LoLPro;