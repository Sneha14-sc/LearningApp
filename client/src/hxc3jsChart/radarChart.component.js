/**
 * Created by sanolab on 2017/09/29.
 */
/**
 * Created by sanolab on 2017/09/28.
 */
(function(){
    "use strict";
    angular.module('hxc3jsChart')
        .component('radarChart',{
            templateUrl:'/src/hxc3jsChart/radarChart.html',
            controller:radarChartController,
            // controllerAs: "ctrl",
            bindings:{
                radarData:'<'
            }
        });
    radarChartController.$inject=['$scope'];
    function  radarChartController($scope) {
        var $ctrl = this;

        console.log('inside radar chart');
      $ctrl.labels = $ctrl.radarData.labels;
      $ctrl.data = $ctrl.radarData.data;

        $ctrl.options = $ctrl.radarData.options;
        console.log('data',$ctrl.data);

        // $scope.$watch('$ctrl.radarData',function(newVal, oldVal){
        //     console.log('changed');
        //     // console.log('type chart',$ctrl.radarData.columns[1]);
        //
        //     $ctrl.drawData = $ctrl.radarData;
        // },true);

    }


})();