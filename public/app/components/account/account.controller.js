(function() {
    'use strict';

    angular
        .module('awesomeApp.account',['RiotDirectives','awesomeSnippet'])
        .controller('FormCtrl', FormCtrl);

    /* @ngInject */
    function FormCtrl($state,$window,Riot,Users) {
        var vm = this;
		vm.signupForm={};
		vm.loginForm={};
		vm.processLoginForm=processLoginForm;
		vm.processSignupForm=processSignupForm;

		vm.bind={
			have:false,
			lolacc:{},
			setBind:function(summoner){
				this.have=true;
				this.lolacc=summoner;
				vm.signupForm.lolid=summoner.id;
				vm.signupForm.lolacc=summoner.name;
				vm.signupForm.region=summoner.region;
			},
			removeBind:function(){
				this.have=false;
				this.lolacc={};
				delete vm.signupForm.lolid;
				delete vm.signupForm.lolacc;
				delete vm.signupForm.region;
			}
		};

		function processLoginForm() {
			Users.loginUser(vm.loginForm)
				.success(function(data){
					if(data.success===true){
						vm.loginForm={};
						$window.sessionStorage.token = data.token;
						$window.sessionStorage.logged=true;
						//vm.setLoggedState($window.sessionStorage.logged);
						$state.go('home');
					}else{
						vm.errorName=data.errors.name;
						vm.errorPassword=data.errors.password;
					}
				})
				.error(function(data){
			        delete $window.sessionStorage.token;
			        vm.message = 'Error: Invalid user or password';
					console.log(data);
				});
		};

	    function processSignupForm() {
			if(!vm.bind.have){
				$state.go('account.form.bindlol');
			}else if(vm.signupForm.name===undefined){
				$state.go('account.form.local');
			}else{
				Users.createNewUser(vm.signupForm)
			    	.success(function(data) {
			    		console.log(data);
						if(data.success===true){
							vm.signupForm={};
							$state.go('account.login');
						}else{
							vm.errorName=data.errors.name;
							vm.errorEmail=data.errors.email;
							$state.go('account.form.local');
						}
					});
			}
			
	    	

    	};
    }
})();