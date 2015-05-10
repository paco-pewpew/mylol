'use strict';
function ClassAttribute(){
	this.dataSet=[];
	this.mean;
	this.variance;
}
ClassAttribute.prototype.calculateMean=function(){
	this.mean=this.dataSet.reduce(function(previous,current){
		return previous+current;
	},0)/this.dataSet.length;
};
ClassAttribute.prototype.calculateVariance=function(){
	var mu=this.mean;
	this.variance=this.dataSet.reduce(function(previous,current){
		return previous+Math.pow(current-mu,2);
	},0)/this.dataSet.length;
};

function MiningClass(){
	this.occurrences=0;
	this.kills=new ClassAttribute();
	this.deaths=new ClassAttribute();
	this.assists=new ClassAttribute();
}
MiningClass.prototype.calculateGaussianParameters=function(){
	[this.kills,this.deaths,this.assists].forEach(function(property){
		property.calculateMean();
		property.calculateVariance();
	});
};

function calculateProperty(value,property,classModel){
	var m=classModel[property].mean;
	var v=classModel[property].variance;
	return (1/Math.sqrt(2*Math.PI*v))*Math.exp(-(Math.pow(value-m,2)/(2*v)));
}

function calculateAllProperties(subject,classesContainer){
	for(var classModel in classesContainer){
		if(classesContainer[classModel] instanceof MiningClass){
			for(var property in classesContainer[classModel]){
				if(classesContainer[classModel][property] instanceof ClassAttribute){
					subject[property+classModel]=calculateProperty(subject[property],property,classesContainer[classModel]);
				}
			}
		}
	}
}

function calculateChancesAllClasses(subject,classesContainer){
	for(var classModel in classesContainer){
		if(classesContainer[classModel] instanceof MiningClass){
			var chance=1;
			for(var property in classesContainer[classModel]){
				if(classesContainer[classModel][property] instanceof ClassAttribute){
					chance*=subject[property+classModel];
					//subject[property+classModel]=calculate(subject[property],property,classesContainer[classModel]);
				}
			}
			subject[classModel+'Chance']=chance;
		}
	}
}

function calculateProbabilityAllClasses(subject,classesContainer){
	var all=0;
	for(var classModel in classesContainer){
		if(classesContainer[classModel] instanceof MiningClass){
			all+=subject[classModel+'Chance']*classesContainer[classModel].occurrences;
		}
	}

	for(var classModel in classesContainer){
		if(classesContainer[classModel] instanceof MiningClass){
			subject[classModel+'Probability']=(subject[classModel+'Chance']*classesContainer[classModel].occurrences)/all;
		}
	}				

}

function getMostProbableClass(subject,classesContainer){
	var maxProbability=0;
	var result='most probable class';
	for(var classModel in classesContainer){
		if(classesContainer[classModel] instanceof MiningClass){
			if(subject[classModel+'Probability']>maxProbability){
				maxProbability=subject[classModel+'Probability'];
				result=classModel;	
			}
		}
	}
	return {'class':result,probability:maxProbability};				

}

module.exports={
	mineClass:MiningClass,
	calculateAllProperties:calculateAllProperties,
	calculateChancesAllClasses:calculateChancesAllClasses,
	calculateProbabilityAllClasses:calculateProbabilityAllClasses,
	getMostProbableClass:getMostProbableClass
};