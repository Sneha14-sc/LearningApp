/**
 * Created by sanolab on 2017/09/11.
 */
(function() {
    'use strict';

    angular.module('hxLearningApp')
        .config(routeConfig);

    /**
     * Configures the routes and views
     */
    routeConfig.$inject = ['$stateProvider'];
    function routeConfig ($stateProvider) {
        // Routes
        $stateProvider
            .state('hxLearningApp', {
                abstract: true,
                templateUrl: 'src/hxLearningApp/learningApp.html'
            })

            .state('hxLearningApp.learningProgress',{
                url:'/hxLearningApp/learningProgress',
                templateUrl:'src/hxLearningApp/learningProgressDisp.html',
                controller:'learningProgressController',
                controllerAs:'$leProDi'
            })

            .state('hxLearningApp.learningQuestions',{
                url:'/hxLearningApp/learningQuestions',
                templateUrl:'src/hxLearningApp/learningQuestionsDisp.html',
                controller:'learningQuestionsController',
                controllerAs:'$leQueDi'
            })

    }
})();
