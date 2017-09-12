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
        // $ctrl.categories=$ctrl.questionData.categories;
        // $ctrl.number=$ctrl.questionData.number;
        // $ctrl.year=$ctrl.questionData.year;
        // $ctrl.description=$ctrl.questionData.description;
        // $ctrl.question=$ctrl.questionData.question;
        // $ctrl.answersNumber=[];
        // $ctrl.answersContent=[];
        // var i;
        // for(i=0;i<4;i++) {
        //     $ctrl.answersNumber.push($ctrl.questionData.answers[i][0])
        // };
        // var j;
        // for(j=0;j<4;j++) {
        //     $ctrl.answersContent.push($ctrl.questionData.answers[j][1])
        // };
        // $ctrl.correctAnswer = $ctrl.questionData.correctAnswer;
        // $ctrl.explanation = $ctrl.questionData.explanation;
        //
        //
        // $scope.$watch('$ctrl.questionData',function(newVal, oldVal){
        //     console.log('changed');
        //     $ctrl.status='inside questionDisp component';
        //     $ctrl.categories=$ctrl.questionData.categories;
        //     $ctrl.number=$ctrl.questionData.number;
        //     $ctrl.year=$ctrl.questionData.year;
        //     $ctrl.description=$ctrl.questionData.description;
        //     $ctrl.question=$ctrl.questionData.question;
        //     $ctrl.answersNumber=[];
        //     $ctrl.answersContent=[];
        //     var i;
        //     for(i=0;i<4;i++) {
        //         $ctrl.answersNumber.push($ctrl.questionData.answers[i][0])
        //     };
        //     var j;
        //     for(j=0;j<4;j++) {
        //         $ctrl.answersContent.push($ctrl.questionData.answers[j][1])
        //     };
        //     $ctrl.correctAnswer = $ctrl.questionData.correctAnswer;
        //     $ctrl.explanation = $ctrl.questionData.explanation;
        // },true);

        $scope.$watch('$ctrl.questionData',function(newVal, oldVal){
            $ctrl.flagClickAnswer=false;
        },true);
        $ctrl.answerItem= function (answerNumber) {
            $ctrl.answerNow=answerNumber;

        };
        $ctrl.answerStatus=function () {
            $ctrl.flagClickAnswer=true;
            $ctrl.answerResult=$ctrl.answerNow;
            if ($ctrl.answerResult===$ctrl.questionData.correctAnswer) {
                console.log('right');
            }
            else {
                console.log('wrong');
            }
        }
    };





})();
