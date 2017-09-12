/**
 * Created by sanolab on 2017/06/30.
 */
/**
 * Created by sanolab on 2017/06/11.
 */
(function() {
    'use strict';

    angular.module('hxc3jsChart')
        .config(routeConfig);

    /**
     * Configures the routes and views
     */
    routeConfig.$inject = ['$stateProvider'];
    function routeConfig ($stateProvider) {
        // Routes
        $stateProvider
            .state('hxc3jsChart', {
                abstract: true,
                templateUrl: 'src/hxc3jsChart/c3jsChart.html'
            })

            .state('hxc3jsChart.c3jsChartDisplay',{
                url:'/hxc3jsChart/c3jsChartDisplay',
                templateUrl:'src/hxc3jsChart/c3jsChartDisplay.html',
                controller:'c3jsChartDisplayController',
                controllerAs:'$c3jsChart'
            })


    }
})();
