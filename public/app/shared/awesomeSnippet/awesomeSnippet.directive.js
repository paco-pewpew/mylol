(function() {
    'use strict';

    angular
        .module('awesomeSnippet',[])
        .directive('awsSnippet', awsSnippet);

    /* @ngInject */
    function awsSnippet () {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            scope: {
            	summoner:'@',
				approveFunction:'&accept',
				removeFunction:'&remove'
            },
            templateUrl:'app/shared/awesomeSnippet/awesomeSnippet.view.html'
        };
        return directive;

        function link(scope, element, attrs) {
        	if(!attrs.accept){delete scope.approveFunction;}
			if(!attrs.remove){delete scope.removeFunction;}
        }
    }

    /* @ngInject */
    function Controller ($scope,Riot) {
    	//$scope won't be needed in angular 1.3 due to bindToController option
    	var vm=this;
		vm.allowedRegions=['euw','eune','na'];
		vm.searchForm={region:vm.allowedRegions[0]};
		vm.result=($scope.summoner?JSON.parse($scope.summoner):'');
		vm.checkAccount=checkAccount;
		vm.acceptSummoner=acceptSummoner;
		vm.rejectSummoner=rejectSummoner;
		vm.removeSummoner=removeSummoner;

		function checkAccount(){
			console.log(vm.searchForm.region,vm.searchForm.name);
			if(vm.searchForm.region && vm.searchForm.name){
				console.log('searching for player');
				Riot.getSummoner(vm.searchForm.region,vm.searchForm.name)
					.success(function(data){
						console.log('Success',data);
						vm.result=data[Object.keys(data)[0]];
						vm.result.region=vm.searchForm.region;
						console.log(vm.result);
					})
					.error(function(data){
						console.log('Error',data);
					});
			}
		}

		function acceptSummoner(){
			$scope.approveFunction({result:vm.result});
			delete vm.result;	
			vm.searchForm={};
		}

		function rejectSummoner(){
			delete vm.result;	
			$scope.searchForm={};
		}

		function removeSummoner(){
			$scope.removeFunction();
		}
    }
})();


/*'use strict';
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

		},
		templateUrl:'app/shared/awesomeSnippet/awesomeSnippetView.html'
	};
	

});*/



