(function () {
    "use strict";

    angular.module('hxPOSAdmin',[
                    // 'auth0.auth0',
                     'ui.router',
                    // 'angular-jwt',
                    'ngMaterial',
                    'groupChart',
                    'hxStaffLanguageModule',
                    'hxAdminComponents',
                    'hxNotificationModule'])
        .constant('ApiPath','/api')
        .config(config)
        .run(firstRunFn);

    config.$inject = ['$urlRouterProvider','$locationProvider','$mdThemingProvider'];
    function config($urlRouterProvider,$locationProvider,$mdThemingProvider) {

        // If user goes to a path that doesn't exist, redirect to public root
        // $urlRouterProvider.otherwise('/');
        // $locationProvider.hashPrefix('!');
        // $locationProvider.html5Mode({enabled: true,requireBase: true}); // remove hash tag in SPA, also add <base href="/"> in index.html
        $mdThemingProvider.theme('docs-dark')
          .primaryPalette('yellow')
          .accentPalette('orange')
          .warnPalette('red')
          .backgroundPalette('deep-orange');

    }
    firstRunFn.$inject= ['$rootScope', 'AuthRedirectorService'];
    function firstRunFn($rootScope, AuthRedirectorService) {
        // Apply auth rules when state changes
        //*TEMPORARY OFF FOR DEVELOPMENT*
        //$rootScope.$on('$stateChangeStart', AuthRedirectorService.onStateChangeStart);
    }
})();
