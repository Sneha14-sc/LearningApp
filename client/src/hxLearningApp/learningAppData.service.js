/**
 * Created by sanolab on 2017/09/12.
 */
(function(){
    angular.module('hxLearningApp')
        .service('learningAppDataService',learningAppDataService);

    learningAppDataService.$inject=['$rootScope'];
    function learningAppDataService($rootScope){
        var service = this;
        //set up data holder
        service.tempIndex=0;
        service.numberCorrect=0;
        // service.updateNumberCorrectUp=function () {
        //      service.numberCorrect++;
        // };
        //
        // service.updateNumberCorrectDown=function () {
        //     service.numberCorrect--;
        // };
        //
        // service.getNumberCorrect=function () {
        //   return service.numberCorrect;
        // }

    }
})();