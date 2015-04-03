(function() {
    'use strict';

    angular
        .module('awesomeApp.sidebar',[])
        .controller('SidebarCtrl', SidebarCtrl);

    /* @ngInject */
    function SidebarCtrl() {
        var vm = this;
        vm.sidebarData='optional data';
    }
})();

