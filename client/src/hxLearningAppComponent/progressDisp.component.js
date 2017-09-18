/**
 * Created by sanolab on 2017/09/12.
 */
(function(){
    "use strict";
    angular.module('hxLearningAppComponent')
        .component('progressDisp',{
            templateUrl:'/src/hxLearningAppComponent/progressDisp.html',
            controller:progressDispController,
            bindings:{

                correctNumber:'<',
                totalNumber:'<'
            }
        });
    progressDispController.$inject=[];
    function  progressDispController() {
        var $ctrl = this;
        $ctrl.status='inside progressDisp component';
    }


})();
