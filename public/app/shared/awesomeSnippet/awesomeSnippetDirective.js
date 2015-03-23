'use strict';
angular.module('awesomeSnippetDirective',['RiotDirectives'])
.directive('awesomeSnippet',function(){
	return {
		restrict:'EA',
		scope:{
			summoner:'@',
			approveFunction:'&accept',
			removeFunction:'&remove'
		},
		controller:['$scope','Riot',function($scope,Riot){
			$scope.searchForm={};
			$scope.allowedRegions=['euw','eune','na'];
			$scope.searchForm.region='euw';
			if($scope.summoner){
				$scope.result=JSON.parse($scope.summoner);
			}

			console.log($scope.summoner);

			$scope.checkAccount=function(){
				console.log($scope.searchForm.region,$scope.searchForm.name);
				if($scope.searchForm.region && $scope.searchForm.name){
					console.log('searching for player');
					Riot.getSummoner($scope.searchForm.region,$scope.searchForm.name)
						.success(function(data){
							console.log('Success',data);
							$scope.result=data[Object.keys(data)[0]];
							$scope.result.region=$scope.searchForm.region;
							console.log($scope.result);
						})
						.error(function(data){
							console.log('Error',data);
						});
				}
			};

			$scope.acceptSummoner=function(){
				console.log('returning to outer function with ',$scope.result);
				$scope.approveFunction({result:$scope.result});
				delete $scope.result;	
				$scope.searchForm={};
			};
			$scope.rejectSummoner=function(){
				delete $scope.result;	
				$scope.searchForm={};
			};

			$scope.removeSummoner=function(){
				$scope.removeFunction();
			};

		}],
		link:function(scope,element,attrs){
			if(!attrs.accept){delete scope.approveFunction;}
			if(!attrs.remove){delete scope.removeFunction;}

			/*console.log(element[0].style);
			element.css({
				'width':'60%'
			});
			console.log(element[0].style.width);*/
		},
		templateUrl:'app/shared/awesomeSnippet/awesomeSnippetView.html'
	};
	

});



