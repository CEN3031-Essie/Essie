(function () {
  'use strict';

  // controller specifically for the view of all possible forms
  // TODO: move logic from html view into controller
  // TODO: add additional logic for view adjustment and authentication
  angular.module('forms').controller('FormsListController', FormsListController);

  FormsListController.$inject = ['$scope', '$state', 'Authentication'];

  function FormsListController($scope, $state, Authentication) {
    $scope.authentication = Authentication;

    if (!$scope.authentication.user) {
      $state.go($state.previous.state.name || 'home', $state.previous.params);
    }

    if ($scope.authentication.user.roles.indexOf('admin') > -1)
      $scope.isAdmin = true;
    else
      $scope.isAdmin = false;
  }
})();
