'use strict';
angular.module('TemplatesService',[])
	.factory('Templates',['$http',function($http){
		return {
			get:function(){
				return $http.get('/api/champions');
			},
			post:function(data){
				return $http.post('/api/champions',data);
			},
			delete:function(id){
				return $http.delete('/api/champions/id'+id);
			}
		};
	}])
	.factory('TemplatesById',['$http',function($http){
		return {
			get:function(id){
				return $http.get('/api/champions/id'+id);
			},
			put:function(id,data){
				return $http.put('/api/champions/id'+id,data);
			},
			delete:function(id){
				return $http.delete('/api/champions/id'+id);
			}
		};
	}])
	.factory('TemplatesByName',['$http',function($http){
		return {
			get:function(name){
				return $http.get('/api/champions/name'+name);
			}
		};
	}]);