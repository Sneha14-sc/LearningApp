/**
 * Created by sanolab on 2017/09/13.
 */
(function(){
    "use strict";
    angular.module('hxc3jsChart')
        .component('drawChart',{
            templateUrl:'/src/hxc3jsChart/drawChart.html',
            controller:drawChartController,
            // controllerAs: "ctrl",
            bindings:{
                drawData:'<',
                dataTitle:'@'
            }
        });
    drawChartController.$inject=['$scope'];
    function  drawChartController($scope) {
        var $ctrl = this;

        console.log('inside drawChart component');
        $ctrl.chartTest = c3.generate({
            bindto: '#drawChart',
            data: {
                columns: $ctrl.drawData,
                type: 'donut'
                // onclick: function (d, i) { console.log("onclick", d, i); },
                // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            },
            donut: {
                title: $ctrl.dataTitle
            }

        });



        $scope.$watch('$ctrl.drawData',function(newVal, oldVal){
            console.log('changed');
            // console.log('type chart',$ctrl.drawData.columns[1]);
            $ctrl.chartTest.load({
                columns: $ctrl.drawData

            });
        },true);

    }


})();
