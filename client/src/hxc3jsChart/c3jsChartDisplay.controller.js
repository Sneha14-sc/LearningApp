/**
 * Created by sanolab on 2017/06/30.
 */
/**
 * Created by sanolab on 2017/06/14.
 */

(function() {
        "use strict";
        angular.module('hxc3jsChart')
            .controller('c3jsChartDisplayController', c3jsChartDisplayController);
        c3jsChartDisplayController.$inject = ['$rootScope','$interval'];
        function c3jsChartDisplayController($rootScope,$interval) {
            var $c3jsChart = this;
            $c3jsChart.printedCheck="Check ok";


            $c3jsChart.randomScalingFactor = function() {
                return Math.round(Math.random() * 100);
            };





            $c3jsChart.listChart=[
                'line',
                'bar',
                'pie'
            ];
            ///
            $c3jsChart.radarData = {
                labels : ["January", "February", "March", "April", "May", "June", "July"],
                series: ['Series A', 'Series B'],
                data: [
                    [65, 59, 80, 81, 56, 55, 40],
                    [28, 48, 40, 19, 86, 27, 90]
                ],
                options: {
                    scales: {
                        yAxes: [
                            {
                                id: 'y-axis-1',
                                type: 'linear',
                                display: true,
                                position: 'left'
                            },
                            {
                                id: 'y-axis-2',
                                type: 'linear',
                                display: true,
                                position: 'right'
                            }
                        ]
                    }
                }
            };


            ///

            $c3jsChart.chart={

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


            $interval(function () {
                $c3jsChart.chart.columns= [
                    ['x', 'February','March','April','May','June','July'],
                    ['data1', 10, 200, 300, 200,20,$c3jsChart.randomScalingFactor()],
                    ['data2', 10, 80, 300, 20, 150, 45]

                ];

                // $c3jsChart.chart.colors= {
                //     data1:'yellow',
                //     data2:'green'
                // };


            },5000);









        }
    }
)();






            // $c3jsChart.radarData = {
            //     labels : ["January", "February", "March", "April", "May", "June", "July"],
            //     series: ['Series A', 'Series B'],
            //     data: [
            //         [65, 59, 80, 81, 56, 55, 40],
            //         [28, 48, 40, 19, 86, 27, 90]
            //         ],
            //     options: {
            //         scales: {
            //             yAxes: [
            //                 {
            //                     id: 'y-axis-1',
            //                     type: 'linear',
            //                     display: true,
            //                     position: 'left'
            //                 },
            //                 {
            //                     id: 'y-axis-2',
            //                     type: 'linear',
            //                     display: true,
            //                     position: 'right'
            //                 }
            //             ]
            //         }
            //     }
            // };

            // $c3jsChart.drawData= {
            //     correctNumber : 1,
            //     totalNumber: 5
            // };





