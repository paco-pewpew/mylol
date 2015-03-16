'use strict';
angular.module('SidebarController',['RiotDirectives','VisualDirectives'])
	.controller('SidebarCtrl',['$scope','$window',function($scope,$window){
		$scope.sidebarData=JSON.parse($window.sessionStorage.userRiot);
	}]);