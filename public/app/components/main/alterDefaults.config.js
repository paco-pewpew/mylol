(function() {
  'use strict';

  angular
  .module('alterBootstrap', [])
  .filter('unsafe', unsafe)
  .run(alterPopover);

  /* @ngInject */
  function unsafe($sce) {
    return unsafeFilter;

    ////////////////
    function unsafeFilter(val) {
      return $sce.trustAsHtml(val);
    }
  }

  /* @ngInject */
  function alterPopover($templateCache) {
    $templateCache.put('template/popover/popover.html',
      '<div class=\'popover {{placement}}\' ng-class=\'{ in: isOpen(), fade: animation() }\'>\n' +
      '  <div class=\'arrow\'></div>\n' +
      '\n' +
      '  <div class=\'popover-inner\'>\n' +
      '      <h3 class=\'popover-title\' ng-bind-html=\'title | unsafe\' ng-show=\'title\'></h3>\n' +
      '      <div class=\'popover-content\'ng-bind-html=\'content | unsafe\'></div>\n' +
      '  </div>\n' +
      '</div>\n' +
      '');
  }

})();

