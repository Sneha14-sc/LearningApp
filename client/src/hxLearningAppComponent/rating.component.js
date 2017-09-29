/**
 * Created by sanolab on 2017/09/12.
 */
(function(){
    "use strict";
    angular.module('hxLearningAppComponent')
        .component('ratingComp',{
            templateUrl:'/src/hxLearningAppComponent/rating.html',
            controller:ratingController,
            // controllerAs: "ctrl",
            bindings:{
                // typeChart:'<',
                rating:'='
            }
        });
    ratingController.$inject=['$scope','hxScoreNotifService'];
    function  ratingController($scope,hxScoreNotifService) {
        var $ctrl = this;
        console.log('ratingController ok!');
        $ctrl.like=function(){
          $ctrl.rating.like++;
        };

        $ctrl.dislike=function(){
          $ctrl.rating.displike--;
        };
      }
})();
