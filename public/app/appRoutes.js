'use strict';
 angular.module('appRoutes', [])
 	.config(['$stateProvider', '$urlRouterProvider','$httpProvider',
 	 function($stateProvider, $urlRouterProvider,$httpProvider) {
		//add token on every request
		$httpProvider.interceptors.push('authInterceptor');
		
		$stateProvider

			.state('base',{
				abstract:true,
				url:'',
				templateUrl:'app/components/main/mainView.html',
				controller:'MainCtrl'
			})

			.state('home',{
				parent:'base',
				url:'/home',
				resolve:{
					'resA':['$http','$window',function($http,$window){
						return $http.get('/api/riot/self')
							.then(function(data){
								$window.sessionStorage.userRiot = JSON.stringify(data.data);
								return data.data;
							});
					}]
				},
				views:{
					'centralContainer':{
						templateUrl:'app/components/frontpage/frontpageView.html',
						controller:'FrontpageCtrl'
					},
					'sideBar':{
						templateUrl:'app/components/sidebar/sidebarView.html',
						controller:'SidebarCtrl'
					}
				}
			})
			.state('gamer',{
				parent:'base',
				url:'/gamer',
				/*resolve:{
					'getRitoData':['$scope','Riot',function($scope,Riot){
						Riot.getSelfRecent()
							.success(function(data){
								$scope.recentMatchesData=data.games;
								$scope.lastChampionPlayed=data.games[0].championId;
								return 'ggeasy';
							});
					}]
				},*/
				views:{
					'centralContainer':{
						templateUrl:'app/components/gamer/gamerView.html',
						controller:'GamerCtrl'
					},
					'sideBar':{
						templateUrl:'app/components/sidebar/sidebarView.html',
						controller:'SidebarCtrl'
					}
				}
			})
			
			.state('template',{
				parent:'base',
				url:'/template/id:template_id',
				resolve:{
					'resTemplate':['$http','$window','$stateParams','TemplatesById',function($http,$window,$stateParams,TemplatesById){
						return TemplatesById.get($stateParams.template_id)
							.then(function(data){
								return data.data;
							});
					}]
				},
				views:{
					'centralContainer':{
						templateUrl:'app/components/templates/templatesView.html',
						controller:'TemplateCtrl'
					},
					'sideBar':{
						templateUrl:'app/components/sidebar/sidebarView.html',
						controller:'SidebarCtrl'
					}
				}
			})

			

			.state('account',{
				url:'/account',
				templateUrl:'app/components/account/account.html'
			})
			.state('account.form',{
				url:'/form',
				abstract:'true',
				templateUrl:'app/components/account/form.html',
				controller:'FormCtrl'
			})
			.state('account.form.local',{
				url:'/local',
				templateUrl:'app/components/account/form-partials-local.html'
			})
			.state('account.form.bindlol',{
				url:'/bind',
				templateUrl:'app/components/account/form-partials-bindlol.html'
			})
			.state('account.form.finish',{
				url:'/finish',
				templateUrl:'app/components/account/form-partials-finish.html'
			})
			//login form in the account page
			.state('account.login',{
				url:'/login',
				templateUrl:'app/components/account/login.html',
				controller:'FormCtrl'
			});
			$urlRouterProvider.when('/account/form','/account/form/local');
			$urlRouterProvider.otherwise('/account');

			//$locationProvider.html5Mode(true);

	}]);