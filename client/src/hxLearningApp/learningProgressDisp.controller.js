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
            $leProDi.correctNumber=learningAppDataService.numberCorrect;
            $leProDi.totalNumber=5;
            $leProDi.drawData=[
                ['correctNumber',$leProDi.correctNumber],
                ['other',$leProDi.totalNumber-$leProDi.correctNumber]
            ];

            // $leProDi.drawData=[
            //     ['correctNumber',1],
            //     ['totalNumber',2]
            // ];
            $leProDi.drawTitle="Study Status";
        }
    }
)();
