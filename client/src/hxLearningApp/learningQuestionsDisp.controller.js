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
            var service= learningAppDataService;
            $leQueDi.printedCheck="Check learningQuestionController ok!";
            var dummyData=[{
                categories: "歯科理工学 (歯科材料の性質)",
                number:1,
                year:2016,
                description: "",
                question:"接触アレルギーの危険性が低いのはどれか。",
                answers: [
                    {
                        number: 1,
                        content: 'a Ni'
                    },

                    {
                        number: 2,
                        content: 'b Cr'
                    },

                    {
                        number: 3,
                        content: 'c Co'
                    },

                    {
                        number: 4,
                        content: 'd Ti'
                    }
                ] ,
                correctAnswer: 1,
                explanation:'解説内容',
                rating:{
                  like: 1,
                  dislike:0
                },
                image :''
            },
                {
                    categories: "歯科理工学(ワックス)",
                    number:2,
                    year:2015,
                    description: "",
                    question:"インレーワックスの特徴はどれか",
                    answers: [
                        {
                            number: 1,
                            content: 'a 彫刻性が良好である。'
                        },

                        {
                            number: 2,
                            content: 'b 熱収縮が極めて大きい'
                        },

                        {
                            number: 3,
                            content: 'c 加熱後の蒸発残が多い。'
                        },

                        {
                            number: 4,
                            content: 'd 色調が模型の色と類似する'
                        }
                    ] ,
                    image :'images/wax.jpeg',
                    correctAnswer: 2,
                    explanation:'解説内容',
                    rating:{
                      like: 2,
                      dislike:0
                    }
                }
            ];

            $leQueDi.index=learningAppDataService.tempIndex;
            $leQueDi.dataDummy=dummyData[$leQueDi.index];
            $leQueDi.isRight=function () {
              learningAppDataService.numberCorrect++;
            };
            $leQueDi.next = function () {
                $leQueDi.index++;
                $leQueDi.dataDummy=dummyData[$leQueDi.index];
                learningAppDataService.tempIndex= $leQueDi.index;
                // learningAppDataService.numberCorrect++;
            };

            $leQueDi.back = function () {
                $leQueDi.index--;
                $leQueDi.dataDummy=dummyData[$leQueDi.index];

                learningAppDataService.tempIndex= $leQueDi.index;
            };

            $leQueDi.challenge = function (obj) {
                service.challenge=obj;
                $state.go('hxLearningApp.challenge', {challengeQuestion: obj});
            };
            console.log('inside the learningQuestionsController');

        }
    }
)();
