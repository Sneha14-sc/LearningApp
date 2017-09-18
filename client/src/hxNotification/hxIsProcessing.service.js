(function(){

    /**
    *@memberof hxNotificationModule
    *@ngdoc service
    *@name hxIsProcessingService
    *@param {service} $mdDialog angular Material service
    *@description
    * Display processing circular when waiting response
    */
    angular.module('hxNotificationModule')
        .service('hxIsProcessingService',hxIsProcessingService);

   hxIsProcessingService.$inject=['$mdDialog','$rootScope'];
    function hxIsProcessingService($mdDialog, $rootScope){
        var service = this;

        //Show dialog
        /**
         * Show dialog
         * @memberof hxIsProcessingService
         */
        service.display=function(ev){
                $mdDialog.show({
                  templateUrl: '/src/hxNotification/hxIsProcessing.tmpl.html',
                  targetEvent: ev,
                  clickOutsideToClose:false,
                  fullscreen: true, // Only for -xs, -sm breakpoints.
                  escapeToClose: false
                });
        };

        $rootScope.$on('is_Processing', function(event,args){
          console.log('Get request is_Processing');
          service.display('is_Processing');
        });

        $rootScope.$on('done_Processing', function(event,args){
          $mdDialog.cancel();
        });
    }
})();
