(function () {
  'use strict';

  angular
    .module('gforms')
    .controller('GFormsListController', GFormsListController);

  GFormsListController.$inject = ['GFormsService', 'Authentication'];

  function GFormsListController(GFormsService, Authentication) {
    var vm = this;

    vm.gforms = GFormsService.query();
    vm.isAdmin = isAdmin;
    vm.authentication = Authentication;

    //checks to see if the user is an admin and whether they can "create a form or not"
    function isAdmin() {
      return vm.authentication.user.roles.indexOf('admin') > -1;
    }
  }
})();
