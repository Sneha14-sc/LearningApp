/**
 * Created by sanolab on 2017/09/11.
 */
(function() {
        "use strict";
        angular.module('hxLearningApp')
            .controller('learningQuestionsController', learningQuestionsController);
            learningQuestionsController.$inject = [];
        function learningQuestionsController() {
            var $leQueDi = this;
            $leQueDi.printedCheck="Check learningQuestionController ok!";
            console.log('inside the learningQuestionsController');

        }
    }
)();
