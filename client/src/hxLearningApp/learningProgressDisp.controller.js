/**
 * Created by sanolab on 2017/09/12.
 */
(function() {
        "use strict";
        angular.module('hxLearningApp')
            .controller('learningProgressController', learningProgressController);
        learningProgressController.$inject = [];
        function learningProgressController() {
            var $leProDi = this;
            $leProDi.printedCheck="Check learningProgressController ok!";
            console.log('inside the learningProgressController');
            var DummyData = {
                correctNumber: 1,
                totalNumber:5
            };
            $leProDi.dataDummy=DummyData;
        }
    }
)();
