(function () {
    "use strict";

    angular.module('hxStaffLanguageModule')
            .component('languageButton',
              {
                template: '<div ng-click="$ctrl.changeLang()">{{$ctrl.lang}}</div>',
                controller:languageController,
                bindings:{
                  lang:'@'
                }
              });

    languageController.$inject=["$translate"];
    function languageController($translate){
         var $ctrl=this;

         console.log('LanguageController OK');

         $ctrl.changeLang = function(){
           $translate.use($ctrl.lang);
       };
    }
})();
