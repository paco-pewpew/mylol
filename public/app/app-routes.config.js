(function() {
    'use strict';

    angular
        .module('appRoutes',[])
        .config(config);

    /* @ngInject */
    function config($stateProvider, $urlRouterProvider, $httpProvider) {
        //add token on every request
		$httpProvider.interceptors.push('authInterceptor');
		
		$stateProvider

			.state('base', {
				abstract: true,
				url: '',
				resolve: {
					'resBindInfo': resolveUserBindInformation,
					'resStaticData': resolveRiotStaticData,
				},
				views: {
					'main': {
						templateUrl: 'app/components/main/main.view.html',
						controller: 'MainCtrl',
						controllerAs: 'vm'		
					}
				}
			})

			.state('home', {
				parent: 'base',
				url: '/home',
				views: {
					'centralContainer': {
						templateUrl: 'app/components/frontpage/frontpage.view.html',
						controller: 'FrontpageCtrl',
						controllerAs: 'vm'
					}/*,
					'helper': {
						templateUrl: 'app/components/helper/helper.view.html',
						controller: ['$scope', function($scope) {
							$scope.helperData = 'Here you can view snippets of your templates, create new ones and more to come';
						}]
					}*/
				}
			})
			.state('gamer', {
				parent: 'base',
				url: '/gamer',
				views: {
					'centralContainer': {
						templateUrl: 'app/components/gamer/gamer.view.html',
						controller: 'GamerCtrl',
						controllerAs: 'vm'
					},
					'helper': {
						templateUrl: 'app/components/helper/helper.view.html',
						controller: ['$scope', function($scope) {
							$scope.helperData = 'Here you can view data of your bound summoner:  recent games, most played champions and more to cone';
						}]
					}
				}
			})
			
			.state('template', {
				parent: 'base',
				url: '/template/id:template_id',
				resolve: {
					'resTemplate': resolveCurrentTemplate
				},
				views: {
					'centralContainer': {
						templateUrl: 'app/components/templates/templates.view.html',
						controller: 'TemplateCtrl',
						controllerAs: 'vm'
					},
					'helper': {
						templateUrl: 'app/components/helper/helper.view.html',
						controller: ['$scope', function($scope) {
							$scope.helperData = 'Here you can make your templates for specific champion';
						}]
					}
				}
			})

			

			.state('account', {
				url: '/account',
				views: {
					'main': {
						templateUrl: 'app/components/account/account.view.html'
					}
				}
			})
			//signup form in the acccount page
			.state('account.signup', {
				url: '/signup',
				abstract: 'true',
				templateUrl: 'app/components/account/signup.view.html',
				controller: 'FormCtrl',
				controllerAs: 'vm'
			})
			.state('account.signup.local', {
				url: '/local',
				templateUrl: 'app/components/account/signup-local.view.html'
			})
			.state('account.signup.bindlol', {
				url: '/bind',
				templateUrl: 'app/components/account/signup-bindlol.view.html'
			})
			.state('account.signup.finish', {
				url: '/finish',
				templateUrl: 'app/components/account/signup-finish.view.html'
			})
			//login form in the account page
			.state('account.login', {
				url: '/login',
				templateUrl: 'app/components/account/login.view.html',
				controller: 'FormCtrl',
				controllerAs: 'vm'
			})
			//edit acc info
			.state('account.info', {
				url: '/info',
				templateUrl: 'app/components/account/info.view.html',
				controller: 'InfoCtrl',
				controllerAs: 'vm'
			});
			$urlRouterProvider.when('/account/signup','/account/signup/local');
			$urlRouterProvider.otherwise('/account');

			//$locationProvider.html5Mode(true);
    }

	/* @ngInject */
	function resolveUserBindInformation(Riot,loggedUser) {
		return Riot.getSelf()
			.then(function(data) {
				console.log('me: ',data.data);
				loggedUser.local = data.data.local;
				loggedUser.name = data.data.name;
				loggedUser.id = data.data.id;
				loggedUser.region = data.data.region;
				console.log(loggedUser);
				return data.data;
			});
	}

	/* @ngInject */
	function resolveRiotStaticData(Riot) {
		return Riot.getStaticData()
			.then(function(fetchedData) {
				var staticData = fetchedData.data;
				var championList = {};
				for(var champ in staticData.champion) {
						championList[staticData.champion[champ].key] = staticData.champion[champ].id;
				}
				staticData.championList = championList;
				console.log(staticData);
				return staticData;
			});
	}

	/* @ngInject */
	function resolveCurrentTemplate($stateParams, templatesData) {
		return templatesData.getById($stateParams.template_id)
			.then(function(data) {
				return data.data;
			});
	}


})();