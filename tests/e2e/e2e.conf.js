'use strict';

exports.config = {
  params: {
    login: {
      username: 'nubwalker',
      password: 'swag'
    } 
  },

  baseUrl: 'http://localhost:1337', 
  specs: ['**/*.spec.js'],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },

  directConnect: true,

  seleniumAddress: 'http://0.0.0.0:4444/wd/hub',
  
  capabilities: {
    'browserName': 'chrome'
  },

  suites: {
    account: 'account/*.spec.js',
    frontpage: 'frontpage/*.spec.js',
    templates: 'templates/*.spec.js'
  },

  onPrepare: function() {
    var disableNgAnimate = function() {
      angular.module('disableNgAnimate', []).run(function($animate) {
        $animate.enabled(false);
      });
    };

    browser.driver.manage().window().setSize(1366,768);
    browser.addMockModule('disableNgAnimate', disableNgAnimate);
  }

};
