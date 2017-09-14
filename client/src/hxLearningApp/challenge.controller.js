(function() {
        "use strict";
        angular.module('hxLearningApp')
            .controller('challengeController', challengeController);
            challengeController.$inject = ['$state','learningAppDataService','hxNotificationService', '$stateParams'];
        function challengeController($state,learningAppDataService, hxNotificationService, $stateParams) {
          var $ctrl=this;
          var dataService=learningAppDataService;
          var notifService=hxNotificationService;

          $ctrl.friendList=dataService.friendList;
          $ctrl.selectedFriend={};
          $ctrl.question=$stateParams.challengeQuestion;
          console.log({question:$stateParams.challengeQuestion});
          if ($ctrl.question) {
            $ctrl.btnColor="green";
          }else{
            $ctrl.btnColor="grey";
          }

          $ctrl.send=function(){
            var index=$ctrl.selectedIndex;
            var message="Send to " +
                        $ctrl.friendList[index].name +
                        " question number "+
                        $ctrl.question.number;
            notifService.showNotif(5000, message);
            $ctrl.selectedIndex = null;
            console.log('Sent question to friend');
          };

          $ctrl.selectedItem= function (index) {
              if ($ctrl.selectedIndex === null) {
                  $ctrl.selectedIndex = index;
                }
                else if ($ctrl.selectedIndex === index) {
                  $ctrl.selectedIndex = null;
                }
                else {
                  $ctrl.selectedIndex = index;
                }
          };
        }
})();
