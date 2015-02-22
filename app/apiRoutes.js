'use strict';
var User=require('./models/User.js');



module.exports=function(router){

	//ROUTES
	router.route('/')
		.get(function(req,res){
			res.json({message:'sup swag. Check /champions to GET all or POST one /id:champ_id to GET PUT DELETE one and return all /name:champ_name to GET PUT DELETE one'});
		});
	router.route('/user')
		.get(function(req,res){
			User.find(function(err,result){
				if(err)
					res.send(err);
				res.json(result);
			});
		})
		.post(function(req,res){
			var newUser=new User();
			newUser.local.name=req.body.name;
			newUser.local.email=req.body.email;
			newUser.local.password=newUser.generateHash(req.body.password);
			newUser.riot.lolacc=req.body.lolacc;
			newUser.riot.region=req.body.region;
			newUser.save(function(err){
				if(err)
					res.send(err);
				res.json({message:'user created'});
			});
		});
	//search user by name; Probably for initial log in		
	router.route('/user/name:user_name')
		.get(function(req,res){
			User.find({
				'local.name':req.params.user_name
			},function(err,result){
				if(err)
					res.send(err);
				res.json(result);
			});
		});
	router.route('/user/id:user_id')
		.get(function(req,res){
			User.findById(req.params.user_id,function(err,result){
				if(err)
					res.send(err);
				res.json(result);
			});
		})
		.put(function(req,res){
			User.findByIdAndUpdate(req.params.user_id,{
				$set:{
					'riot.lolid':req.body.lolid,
					'riot.lolacc':req.body.lolacc,
					'riot.region':req.body.region
				}},function(err,result){
					if(err)
						res.send(err);
					res.json(result);
				});
		})
		.delete(function(req,res){
			User.findByIdAndRemove(req.params.user_id,function(err,result){
				if(err)
					res.send(err);
				res.json(result);
			});
		});


	
	};