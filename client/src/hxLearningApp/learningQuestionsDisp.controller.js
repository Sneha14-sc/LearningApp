/**
 * Created by sanolab on 2017/09/11.
 */
(function() {
        "use strict";
        angular.module('hxLearningApp')
            .controller('learningQuestionsController', learningQuestionsController);
            learningQuestionsController.$inject = ['$state','learningAppDataService'];
        function learningQuestionsController($state,learningAppDataService) {
            var $leQueDi = this;
            $leQueDi.printedCheck="Check learningQuestionController ok!";
            var dummyData=[{
                categories: "teeth",
                number:1,
                year:2017,
                description: "the question about teeth",
                question:"this is question content",
                answers: [
                    {
                        number: 1,
                        content: 'The answer 1'
                    },

                    {
                        number: 2,
                        content: 'The answer 2'
                    },

                    {
                        number: 3,
                        content: 'The answer 3'
                    },

                    {
                        number: 4,
                        content: 'The answer 4'
                    }
                ] ,
                correctAnswer: 1,
                explanation:'this is the explanation for the question',
            },
                {
                    categories: "lung",
                    number:2,
                    year:2017,
                    description: "the question about teeth",
                    question:"this is question content",
                    answers: [
                        {
                            number: 1,
                            content: 'The answer 1'
                        },

                        {
                            number: 2,
                            content: 'The answer 2'
                        },

                        {
                            number: 3,
                            content: 'The answer 3'
                        },

                        {
                            number: 4,
                            content: 'The answer 4'
                        }
                    ] ,
                    correctAnswer: 2,
                    explanation:'this is the explanation for the question'
                }
            ];
            $leQueDi.index=0;
            $leQueDi.dataDummy=dummyData[$leQueDi.index];
            $leQueDi.isRight=function () {
              return true;
            };
            $leQueDi.next = function () {
                $leQueDi.index++;
                $leQueDi.dataDummy=dummyData[$leQueDi.index];
                learningAppDataService.updateNumberCorrect();
                console.log('index',$leQueDi.index);
            };
            console.log('inside the learningQuestionsController');

        }
    }
)();
