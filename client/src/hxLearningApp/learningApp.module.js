/**
 * Created by sanolab on 2017/09/11.
 */
(function () {
    "use strict";
    angular.module('hxLearningApp',['ui.router','ngMaterial','hxc3jsChart'])
        .config(config);
    config.$inject = ['$urlRouterProvider'];
    function config($urlRouterProvider) {

        // If user goes to a path that doesn't exist, redirect to public root
        $urlRouterProvider.otherwise('/');
    }

})();