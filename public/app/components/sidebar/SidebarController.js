'use strict';
angular.module('SidebarController',['RiotDirectives','VisualDirectives'])
	.controller('SidebarCtrl',['$scope','$window',function($scope,$window){
		$scope.sidebarData='optional data relevant* to the state';
	}]);