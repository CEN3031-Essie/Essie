(function () {
  'use strict';

  angular
    .module('gforms')
    .controller('GFormsListController', GFormsListController);

  GFormsListController.$inject = ['GFormsService'];

  function GFormsListController(GFormsService) {
    var vm = this;

    vm.gforms = GFormsService.query();
  }
})();
