(function() {

  var isDlgOpen;

  /**
  *@memberof hxNotificationModule
  *@ngdoc controller
  *@name notificationCtrl
  *@param {service} $mdToast angular Material service
  *@description
  * Control the manual close button
  */

  angular.module('hxNotificationModule')
         .controller('notificationCtrl', notificationCtrl);

    notificationCtrl.$inject=['$mdToast','data'];
    function notificationCtrl($mdToast, data) {
      var $ctrl=this;
      console.log(data);
      $ctrl.text=data;
      console.log($ctrl.text);

      /**
       * Check if Dialog is opened or not, if open --> hide dialog.
       * @memberof notificationCtrl
       * @method
       */
      $ctrl.closeToast = function() {
        if (isDlgOpen) return;
        $mdToast
          .hide()
          .then(function() {
            isDlgOpen = false;
          });
      };
    }
})();
