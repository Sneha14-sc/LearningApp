/**
 * Created by sanolab on 2017/09/12.
 */
(function() {
        "use strict";
        angular.module('hxLearningApp')
            .controller('learningProgressController', learningProgressController);
        learningProgressController.$inject = ['$state','learningAppDataService'];
        function learningProgressController($state,learningAppDataService) {
            var $leProDi = this;
            $leProDi.printedCheck="Check learningProgressController ok!";
            console.log('inside the learningProgressController');
            $leProDi.correctNumber=learningAppDataService.numberCorrect;
            $leProDi.totalNumber=5;
            $leProDi.drawData1=[
                ['correctNumber',1],
                ['other',5]
            ];
            $leProDi.drawData= {
              correctNumber : $leProDi.correctNumber,
                totalNumber: $leProDi.totalNumber
            };

            ///

            $leProDi.chart={

                columns: [
                    ['x', 'January','February','March','April','May','June'],
                    ['data1', 30, 200, 100, 400, 200],
                    ['data2', 50, 20, 10, 40, 15, 25]

                ],

                names: {
                    data1:'name1',
                    data2:'name2'
                },

                typeChart:'line',
                colors: {
                    data1:'#1f77b4',
                    data2:'red'
                },
                axis: {
                    x: {
                        label: {
                            text: 'Time',
                            position: 'outer-center'
                        },
                        type: 'category',
                        tick: {
                            rotate: 0

                        },
                        height: 60
                    },
                    y: {
                        label: {
                            text: 'Income',
                            position: 'outer-middle'
                        },
                        tick: {
                            format: function (d) { return '$' + d; }
                        }


                    }
                },


                chartTitle:'The c3js Chart'


            };


            $leProDi.radarData = {
              labels: ["Heart", "Brain", "Lung", "Teeth", "Bladder", "Nose", "Ear"],
                data: [
                    [65, 59, 100, 81, 56, 55, 40]
                ],
                options: {
                    scale: {
                        pointLabels: {
                            fontSize: 20
                        }
                    }
                }
            };


            $leProDi.flagShowDetail=false;
           $leProDi.buttonContent='Show Details';
            $leProDi.showDetails = function () {

                if($leProDi.flagShowDetail===true) {
                    $leProDi.flagShowDetail=false;
                   $leProDi.buttonContent='Show Details';
                }
                else {
                    $leProDi.flagShowDetail=true;
                   $leProDi.buttonContent='Hide Details';
                }
            };

            ////////

            console.log('drawData=',$leProDi.drawData);

            // $leProDi.drawData=[
            //     ['correctNumber',1],
            //     ['totalNumber',2]
            // ];
            $leProDi.drawTitle="Study Status";
            $leProDi.changeState=function () {
                $state.go('hxLearningApp.learningQuestions');
            }
        }
    }
)();
