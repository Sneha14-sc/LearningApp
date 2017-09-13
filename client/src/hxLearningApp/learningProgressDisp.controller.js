/**
 * Created by sanolab on 2017/09/12.
 */
(function() {
        "use strict";
        angular.module('hxLearningApp')
            .controller('learningProgressController', learningProgressController);
        learningProgressController.$inject = ['learningAppDataService'];
        function learningProgressController(learningAppDataService) {
            var $leProDi = this;
            $leProDi.printedCheck="Check learningProgressController ok!";
            console.log('inside the learningProgressController');
            $leProDi.correctNumber=learningAppDataService.getNumberCorrect();
            $leProDi.totalNumber=5;
        }
    }
)();
