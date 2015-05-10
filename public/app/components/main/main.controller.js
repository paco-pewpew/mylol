(function() {
  'use strict';

  angular
  .module('awesomeApp.main', [])
  .controller('MainCtrl', MainCtrl);

  /* @ngInject */
  function MainCtrl($state, $window, resBindInfo, Users) {
    var vm = this;
    vm.boundSummoner = resBindInfo;
    vm.logoutUser = logoutUser;

    ////////////////

    function logoutUser() {
      Users.logoutUser();
      $state.go('account.login');
    }
  }
})();
