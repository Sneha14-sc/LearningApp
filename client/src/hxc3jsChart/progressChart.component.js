/**
 * Created by sanolab on 2017/09/28.
 */
(function(){
    "use strict";
    angular.module('hxc3jsChart')
        .component('progressChart',{
            templateUrl:'/src/hxc3jsChart/progressChart.html',
            controller:progressChartController,
            // controllerAs: "ctrl",
            bindings:{
                progressData:'<',
                dataTitle:'@',
                goState:'&'
            }
        });
    progressChartController.$inject=['$scope'];
    function  progressChartController($scope) {
        var $ctrl = this;



          console.log('progressData=',$ctrl.progressData);
          console.log('correctNum=',$ctrl.progressData.correctNumber);
          console.log('totalNum=',$ctrl.progressData.totalNumber);

        // $scope.$watch('$ctrl.progressData',function(newVal, oldVal){
        //     console.log('changed');
        //     // console.log('type chart',$ctrl.progressData.columns[1]);
        //
        //     $ctrl.drawData = $ctrl.progressData;
        // },true);

    }


})();