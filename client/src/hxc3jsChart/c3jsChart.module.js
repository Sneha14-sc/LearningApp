/**
 * Created by sanolab on 2017/06/30.
 */
/**
 * Created by sanolab on 2017/06/11.
 */
(function () {
    "use strict";
    angular.module('hxc3jsChart',['ui.router','ngMaterial','gridshore.c3js.chart','angular-svg-round-progressbar','chart.js'])
        .config(config);
    config.$inject = ['$urlRouterProvider'];
    function config($urlRouterProvider) {

        // If user goes to a path that doesn't exist, redirect to public root
        $urlRouterProvider.otherwise('/');
    }

})();
