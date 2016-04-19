'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$state', '$window',
  function ($scope, Authentication, $state, $window) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    // this function will require the user to login before they can view the forms page
    $scope.goToForms = function() {
      if($scope.authentication.user) {
        $state.go('gforms.list');
      }
      else {
        $state.go('authentication.signin');
      }
    };

    $scope.logOut = function () {
      $window.location.href ='/api/auth/signout';
    };
  }
]);
