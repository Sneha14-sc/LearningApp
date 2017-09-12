/**
 * Created by sanolab on 2017/07/14.
 */


(function(){
    "use strict";
    angular.module('hxc3jsChart')
        .component('c3jsDrawChart',{
            templateUrl:'/src/hxc3jsChart/c3jsDrawChart.html',
            controller:c3jsDrawChartController,
            // controllerAs: "ctrl",
            bindings:{
                // typeChart:'<',
                drawData:'<'
            }
        });
    c3jsDrawChartController.$inject=['$scope','$interval'];
    function  c3jsDrawChartController($scope,$interval) {
        var $ctrl = this;
        $ctrl.statusChart='Show Chart';
        console.log('statusChart',$ctrl.statusChart);

        console.log('in side DrawChart');
        // console.log($ctrl.typeChart);


        $ctrl.chartTitle=$ctrl.drawData.chartTitle;

        $ctrl.statusChart='Update Chart';
        $interval(function () {
            $ctrl.dataTime=new Date();
        },1000);

        console.log('statusChart',$ctrl.statusChart);

        $ctrl.chartTest = c3.generate({
            bindto: '#c3jsDrawChart',
            data: {
                x: 'x',
                columns: $ctrl.drawData.columns,
                names: $ctrl.drawData.names,
                type: $ctrl.drawData.typeChart
            },
            axis:$ctrl.drawData.axis,
            zoom: {
                enabled: true
            },

            colors: $ctrl.drawData.colors,
            // color: {
            //     pattern: $ctrl.drawData.pattern
            // }


        });



        // $scope.$watch('$ctrl.drawData',function(newVal, oldVal){
        //     console.log('changed');
        //     // console.log('type chart',$ctrl.drawData.columns[1]);
        //     $ctrl.chartTest.load({
        //         columns: $ctrl.drawData.columns,
        //         names:   $ctrl.drawData.names,
        //         type:    $ctrl.drawData.typeChart,
        //         colors: $ctrl.drawData.colors
        //         // color: {
        //         //     pattern: $ctrl.drawData.pattern
        //         // }
        //
        //     });
        // },true);

    }


})();

