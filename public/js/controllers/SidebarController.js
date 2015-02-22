'use strict';
angular.module('SidebarController',[])
	.controller('SidebarCtrl',['$scope','$window',function($scope,$window){
		$scope.sidebarData=JSON.parse($window.sessionStorage.userRiot);
	}]);