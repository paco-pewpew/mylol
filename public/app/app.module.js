(function() {
    'use strict';

    angular
        .module('awesomeApp', [
            'ui.router','ui.bootstrap','ngAnimate',
            'alterBootstrap',
            'appRoutes',
			'awesomeApp.main',
			'awesomeApp.account',
			'awesomeApp.frontpage','awesomeApp.gamer','awesomeApp.templates',
			'awesomeApp.sidebar',
			'usersData','templatesData','riotData',
			'visualDirectives',
			'awsSlider','awsSnippet','awsTemplate','awsRiot'
        ]);
})();