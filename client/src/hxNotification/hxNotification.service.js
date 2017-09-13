(function(){

    /**
    *@memberof hxNotificationModule
    *@ngdoc service
    *@name hxNotificationService
    *@param {service} $mdToast angular Material service
    *@description
    * Provide method for other controller to display message as a toast
    */
    angular.module('hxNotificationModule')
        .service('hxNotificationService',hxNotificationService);

   hxNotificationService.$inject=['$mdToast','$rootScope'];
    function hxNotificationService($mdToast, $rootScope){
        var service = this;

        //Show toast
        /**
         * Show notification, parameters are separated for better translation under various circumstance
         * @memberof hxNotificationService
         * @method
         * @param {number} interval how long should the toast be displayed
         * @param {string} message main display content
         * @param {number} [number] - number part of content
         * @param {string} [unit] - to display number with specific unit
         * @param {string} [status] - to display specific status
         */
        service.showNotif=function(interval,message,number,unit,status){
          var item={
            message:message,
            number:number,
            unit:unit,
            status:status
          };
          $mdToast.show({
            hideDelay   : interval||5000,
            position    : 'top',
            controller: 'notificationCtrl',
            controllerAs: '$ctrl',
            locals: {data: item},
            templateUrl : '/src/hxNotification/hxNotification.tmpl.html'
          });
        };

        $rootScope.$on('timecard_invalid', function(event,args){
          service.showNotif(5000,'TIMECARD INVALID');
        });
    }
})();
