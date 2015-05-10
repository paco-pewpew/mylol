(function() {
  'use strict';

  angular
  .module('awesomeApp.gamer')
  .factory('AjaxCall', AjaxCall);

  /* @ngInject */
  function AjaxCall() {

    function AjaxCallStatus(ajaxFunction) {
      this.data = '';
      this.fetch = ajaxFunction;
      this.isFetching = false;
      this.hasError = false;
    }

    return (AjaxCallStatus);
  }
})();