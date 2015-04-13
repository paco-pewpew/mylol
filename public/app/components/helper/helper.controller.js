(function() {
    'use strict';

    angular
        .module('awesomeApp.helper',[])
        .controller('HelperCtrl', HelperCtrl);

    /* @ngInject */
    function HelperCtrl() {
        var vm = this;
        vm.helperData='optional data';
    }
})();

