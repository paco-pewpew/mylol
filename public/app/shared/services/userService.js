'use strict';
angular.module('UserService',[])
	//attach token to header Auth
	.factory('authInterceptor',['$q','$window','$stateParams',function ($q, $window,$stateParams) {
	  return {
	    request: function (config) {
	      config.headers = config.headers || {};
	      if ($window.sessionStorage.token) {
	        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
	      }
	      return config;
	    },
	    response: function (response) {
	      if (response.status === 401) {
	        // handle the case where the user is not authenticated
	        $state.go('account.login');
	      }
	      return response || $q.when(response);
	    }
	  };
	}])
	.value('loggedUser',{
		local:'user local acc name',
		name:'riot acc name',
		id:'riot id',
		region:'riot region'
	})
	//
	.factory('Users',['$http','$window',function($http,$window){
		//help function to transform Form data 
		function transformAndSendForm(method,url,formData){
			return $http({
				    method: method,
				    url: url,
				    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				    transformRequest: function(obj) {
				        var str = [];
				        for(var p in obj)
				        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
				        return str.join('&');
				    },
				    data: formData
				});
		}

		return {
			createNewUser:function(signupFormData){
				return transformAndSendForm('POST','/api/signup/',signupFormData);
			},
			loginUser:function(loginFormData){
				return transformAndSendForm('POST','/api/login/',loginFormData);
			},
			logoutUser:function(){
				delete $window.sessionStorage.logged;
				delete $window.sessionStorage.token;
				delete $window.sessionStorage.userRiot;
			}
		};
	}])
	.factory('UserByName',['$http',function($http){
		return {
			get:function(formData){
				return $http.get('/api/user/name'+formData.name);
			}
		};
	}])
	.factory('UserById',['$http',function($http){
		return {
			get:function(id){
				return $http.get('/api/user/id'+id);
			},
			put:function(id,formData){
				return $http.put('/api/user/id'+id,formData);
			},
			delete:function(id){
				return $http.delete('/api/user/id'+id);
			}
		};
	}]);