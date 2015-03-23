'use strict';
var Champion=require('../models/Champion.js');


function getAllChampions(consumer,callback){
	Champion.find({
		owner:consumer
	},function(err,champs){
		if(err){
			callback(err);
		}else{
			callback(champs);
		}
			
	});
}


module.exports=function(router){
	router.route('/champions')
		.get(function(req,res){
			getAllChampions(req.user.local.name,function(data){
				res.json(data);
			});
		})
		.post(function(req,res){
			Champion.create({
				name:req.body.name,
				owner:req.user.local.name
			},function(err,result){
				if(err)
					res.send(err);
				console.log('attempted to create champion: '+req.user.local.name);
				getAllChampions(req.user.local.name,function(data){
					res.json(data);
				});
			});
		});

	router.route('/champions/id:champ_id')
		.get(function(req,res){
			Champion.findById(req.params.champ_id,function(err,result){
				if(err)
					res.send(err);
				res.json(result);
			});
		})
		.put(function(req,res){
			console.log(req.body.itemBuild);
			console.log(req.body);
			Champion.findByIdAndUpdate(req.params.champ_id,{
				name:req.body.name,
				champion:req.body.champion,
				itemBuild:req.body.itemBuild,
				watchedPros:req.body.watchedPros
			},function(err,result){
				if(err)
					res.send(err);
				// result returns UPDATED doc
				res.json(result);
			});
		})
		.delete(function(req,res){
			Champion.findByIdAndRemove(req.params.champ_id,function(err,result){
				if(err)
					res.send(err);
				//result returns DELETED doc
				getAllChampions(req.user.local.name,function(data){
					res.json(data);
				});
			});
		});

	router.route('/champions/name:champ_name')
		.get(function(req,res){
			Champion.find({
				name:req.params.champ_name
			},function(err,champ){
				if(err)
					res.send(err);
				res.json(champ);
			});
		})
		.put(function(req,res){
			Champion.update({
				name:req.params.champ_name
			},{
				name:req.body.name
			},{multi:true},function(err,result){
				if(err)
					res.send(err);
				//updates FIRST with given name ifno multi:true and returns NUMBER
				res.json(result);
			});
		})
		.delete(function(req,res){
			Champion.remove({
				name:req.params.champ_name
			},function(err,result){
				if(err)
					res.send(err);
				//deletes ALL with given name and returns NUMBER
				res.json(result);
			});
		});
	};