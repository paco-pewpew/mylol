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
				resolve:{
					'resBindInfo':['$http','loggedUser',function($http,loggedUser){
						return $http.get('/api/riot/self')
							.then(function(data){
								console.log('me: ',data.data);
								loggedUser.local=data.data.local;
								loggedUser.name=data.data.name;
								loggedUser.id=data.data.id;
								loggedUser.region=data.data.region;
								return data.data;
							});
					}],
					'resStaticData':['Riot',function(Riot){
						return Riot.getStaticData()
								.then(function(fetchedData){
									var staticData=fetchedData.data;
									var championList={};
									for(var champ in staticData.champion){
											championList[staticData.champion[champ].key]=staticData.champion[champ].id;
									}
									staticData.championList=championList;
									console.log(staticData);
									return staticData;
								});
					}],
				},
				templateUrl:'app/components/main/mainView.html',
				controller:'MainCtrl'
			})

			.state('home',{
				parent:'base',
				url:'/home',
				views:{
					'centralContainer':{
						templateUrl:'app/components/frontpage/frontpageView.html',
						controller:'FrontpageCtrl'
					},
					'sideBar':{
						templateUrl:'app/components/sidebar/sidebarView.html',
						controller:['$scope',function($scope){
							$scope.sidebarData='Here you can view snippets of your templates, create new ones and more to come';
						}]
					}
				}
			})
			.state('gamer',{
				parent:'base',
				url:'/gamer',
				views:{
					'centralContainer':{
						templateUrl:'app/components/gamer/gamerView.html',
						controller:'GamerCtrl'
					},
					'sideBar':{
						templateUrl:'app/components/sidebar/sidebarView.html',
						controller:['$scope',function($scope){
							$scope.sidebarData='Here you can view data of your bound summoner: recent games, most played champions and more to cone';
						}]
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
						controller:['$scope',function($scope){
							$scope.sidebarData='Here you can make your templates for specific champion';
						}]
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