(function() {
    'use strict';

    angular
        .module('awesomeApp', [
            'ui.router','ui.bootstrap','ngAnimate',
            'appRoutes',
			'awesomeApp.main',
			'awesomeApp.account',
			'awesomeApp.frontpage','awesomeApp.gamer','awesomeApp.templates',
			'awesomeApp.sidebar',
			'usersData','templatesData','riotData',
			'VisualDirectives','RiotDirectives',
			'awesomeSlider','awesomeSnippet','awesomeTemplate'
        ]);
})();