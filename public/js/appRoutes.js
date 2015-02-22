'use strict';
 angular.module('appRoutes', [])
 	.config(['$stateProvider', '$urlRouterProvider','$httpProvider',
 	 function($stateProvider, $urlRouterProvider,$httpProvider) {
		//add token on every request
		$httpProvider.interceptors.push('authInterceptor');
		
		$stateProvider
			.state('home',{
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
						templateUrl:'views/home.html',
						controller:'CentralCtrl'
					},
					'sideBar':{
						templateUrl:'views/sidebar.html',
						controller:'SidebarCtrl'
					}
				}
			})
			.state('gamer',{
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
						templateUrl:'views/gamer.html',
						controller:'GamerCtrl'
					},
					'sideBar':{
						templateUrl:'views/sidebar.html',
						controller:'SidebarCtrl'
					}
				}
			})
			
			.state('champion',{
				url:'/champion/id:champion_id',
				resolve:{
					'resTemplate':['$http','$window','$stateParams','ChampionById',function($http,$window,$stateParams,ChampionById){
						return ChampionById.get($stateParams.champion_id)
							.then(function(data){
								return data.data;
							});
					}]
				},
				views:{
					centralContainer:{
						templateUrl:'views/champion.html',
						controller:'ChampionCtrl'
					},
					'sideBar':{
						templateUrl:'views/sidebar.html',
						controller:'SidebarCtrl'
					}
				}
			})

			//Acount page(contained in centralContainer)
			.state('account',{
				url:'/account',
				views:{
					centralContainer:{
						templateUrl:'views/account.html'
					}
				}
			})
			//multistep signup from in the account page
			.state('account.form',{
				url:'/form',
				templateUrl:'views/form.html',
				controller:'FormCtrl'
			})
			.state('account.form.local',{
				url:'/local',
				templateUrl:'views/form-partials-local.html'
			})
			.state('account.form.bindlol',{
				url:'/bind',
				templateUrl:'views/form-partials-bindlol.html'
			})
			.state('account.form.finish',{
				url:'/finish',
				templateUrl:'views/form-partials-finish.html'
			})
			//login form in the account page
			.state('account.login',{
				url:'/login',
				templateUrl:'views/login.html',
				controller:'FormCtrl'
			});
			
			$urlRouterProvider.otherwise('/account');

			//$locationProvider.html5Mode(true);

	}]);