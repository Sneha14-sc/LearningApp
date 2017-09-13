(function(){

    /**
    *@memberof hxNotificationModule
    *@ngdoc service
    *@name hxScoreNotifService
    *@param {service} $mdDialog angular Material service
    *@description
    * Display processing circular when waiting response
    */
    angular.module('hxNotificationModule')
        .service('hxScoreNotifService',hxScoreNotifService);

   hxScoreNotifService.$inject=['$mdDialog','$rootScope'];
    function hxScoreNotifService($mdDialog, $rootScope){
        var service = this;

        //Show dialog
        /**
         * Show dialog
         * @memberof hxIsProcessingService
         */
        service.display=function(ev){
                if (ev=='is_Right'){
                  $mdDialog.show({
                    templateUrl: '/src/hxNotification/hxScoreNotifRight.tmpl.html',
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: false, // Only for -xs, -sm breakpoints.
                    escapeToClose: true
                  });
                } else {
                  $mdDialog.show({
                    templateUrl: '/src/hxNotification/hxScoreNotifWrong.tmpl.html',
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: false, // Only for -xs, -sm breakpoints.
                    escapeToClose: true
                  });
                }
        };

        $rootScope.$on('is_Right', function(event,args){
          console.log('Get request is_Processing');
          service.display('is_Right');
        });

        $rootScope.$on('is_Wrong', function(event,args){
          console.log('Get request is_Processing');
          service.display('is_Wrong');
        });

        $rootScope.$on('done_Processing', function(event,args){
          $mdDialog.cancel();
        });
    }
})();
