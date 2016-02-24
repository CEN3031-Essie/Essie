(function () {
  'use strict';

  angular
    .module('gforms')
    .controller('GFormsController', GFormsController);

  GFormsController.$inject = ['$scope', '$state', 'gformResolve', 'Authentication'];

  function GFormsController($scope, $state, gform, Authentication) {
    var vm = this;

    vm.gform = gform;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing GForm
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.gform.$remove($state.go('gforms.list'));
      }
    }

    // Save GForm
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.gformForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.gform._id) {
        vm.gform.$update(successCallback, errorCallback);
      } else {
        vm.gform.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('gforms.view', {
          gformId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
