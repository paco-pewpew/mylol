(function() {
    'use strict';

    angular
        .module('usersData',[])
        .factory('authInterceptor', authInterceptor)
        .factory('Users',Users)
        .value('loggedUser',loggedUser());
    

    /* @ngInject */
    function authInterceptor($q,$window,$injector) {
        var service = {
            request: request,
            response:response,
            responseError:responseError
        };
        return service;

        ////////////////

        function request(config) {
        	config.headers = config.headers || {};
		    if ($window.sessionStorage.token) {
		      config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
		    }
		    return config;	
        }

        function response(res){
        	return res || $q.when(res);
        }

        function responseError(rejection){
        	//if not user tries to get to page for authenticated
	    	if(rejection.status === 401){
	    		$injector.get('$state').transitionTo('account.login');	
	    	}
	    	return $q.reject(rejection);
        }
    }


    /* @ngInject */
    function Users($http,$window){
    	var service={
    		createNewUser:createNewUser,
    		loginUser:loginUser,
    		logoutUser:logoutUser,
    		editUser:editUser
    	};
    	return service;

    	////////////////

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

		function createNewUser(signupFormData){
			return transformAndSendForm('POST','/api/signup/',signupFormData);
		}

		function loginUser(loginFormData){
			return transformAndSendForm('POST','/api/login/',loginFormData);
		}

		function logoutUser(){
			delete $window.sessionStorage.logged;
			delete $window.sessionStorage.token;
			delete $window.sessionStorage.userRiot;
		}

		function editUser(id,editFormData){
			return transformAndSendForm('PUT','/api/account',editFormData);
		}

    }


    function loggedUser(){
    	var userInfoTemplate={
			local:'user local acc name',
			name:'riot acc name',
			id:'riot id',
			region:'riot region'
		};
    	return userInfoTemplate;
	}
})();