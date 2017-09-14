/**
 * Created by sanolab on 2017/09/12.
 */
(function(){
    "use strict";
    angular.module('hxLearningApp')
        .component('questionDisp',{
            templateUrl:'/src/hxLearningAppComponent/questionDisp.html',
            controller:questionDispController,
            // controllerAs: "ctrl",
            bindings:{
                // typeChart:'<',
                questionData:'<',
                isRight: '&'
            }
        });
    questionDispController.$inject=['$scope'];
    function  questionDispController($scope) {
        var $ctrl = this;
        $ctrl.status='inside questionDisp component';
        $ctrl.selectedIndex=null;

        $scope.$watch('$ctrl.questionData',function(newVal, oldVal){
            $ctrl.flagClickAnswer=false;
            $ctrl.selectedIndex=null;
        },true);

        $ctrl.answerItem= function (index) {
            if ($ctrl.selectedIndex === null) {
                $ctrl.selectedIndex = index;
              }
              else if ($ctrl.selectedIndex === index) {
                $ctrl.selectedIndex = null;
              }
              else {
                $ctrl.selectedIndex = index;
              }
            var answerNumber= $ctrl.questionData.answers[index].number;
            $ctrl.answerNow=answerNumber;

        };

        $ctrl.answerStatus=function () {
            $ctrl.flagClickAnswer=true;
            $ctrl.answerResult=$ctrl.answerNow;
            if ($ctrl.answerResult===$ctrl.questionData.correctAnswer) {
                console.log('right');
                $ctrl.isRight();
            }
            else {
                console.log('wrong');
            }

        }
    };





})();
