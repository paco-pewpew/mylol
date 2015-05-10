(function() {
	'use strict';

	angular
	.module('awesomeApp.account', ['awsSnippet', 'riotData', 'usersData'])
	.controller('FormCtrl', FormCtrl);

	/* @ngInject */
	function FormCtrl($state, $window, $http, Riot, Users) {
		var vm = this;
		vm.errorStack = {};
		vm.signupForm = {};
		vm.loginForm = {};
		vm.processLoginForm = processLoginForm;
		vm.processSignupForm = processSignupForm;

		vm.bind = {
			have: false,
			lolacc: {},
			setBind: function(summoner) {
				this.have = true;
				this.lolacc = summoner;
				vm.signupForm.lolid = summoner.id;
				vm.signupForm.lolacc = summoner.name;
				vm.signupForm.region = summoner.region;
			},
			removeBind: function() {
				this.have = false;
				this.lolacc = {};
				delete vm.signupForm.lolid;
				delete vm.signupForm.lolacc;
				delete vm.signupForm.region;
			}
		};

		vm.patterns = {
			name: /^(?=.{4,16})[a-zA-Z0-9_-]+$/,
			email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
			password: /^(?=.{4,16}$)(?=.*[0-9]+)(?=.*[a-zA-Z]+)[a-zA-Z0-9_-]+$/
		};


		////////////////

		function processLoginForm() {
			Users.loginUser(vm.loginForm)
			.success(function(data) {
				vm.loginForm = {};
				$window.sessionStorage.token = data.token;
				$window.sessionStorage.logged = true;
				$state.go('home');
			})
			.error(function(data) {
				vm.errorStack.name = data.errors.name;
				vm.errorStack.password = data.errors.password;
			});
		}

		function processSignupForm() {
			if (!vm.bind.have) {
				$state.go('account.signup.bindlol');
			} else if (vm.signupForm.name === undefined) {
				$state.go('account.signup.local');
			} else {
				Users.createNewUser(vm.signupForm)
				.success(function(data) {
					vm.signupForm=  {};
					$state.go('account.login');
				})
				.error(function(data) {
					vm.errorStack.name = data.errors.name;
					vm.errorStack.password = data.errors.password;
					vm.errorStack.email = data.errors.email;
					vm.errorStack.bind = data.errors.bind;
					$state.go(!vm.errorStack.bind ? 'account.signup.local' : 'account.signup.bindlol');
				});
			}
		}
		
	}

})();