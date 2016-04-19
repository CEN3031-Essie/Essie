'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus', '$http', '$window',
  function ($scope, $state, Authentication, Menus, $http, $window) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Redirect to signin if guest user tries to access forbidden data
    if (!$state.is('home') && !$scope.authentication.user){
      $state.go('authentication.signin');
    }

    // Makes current user object accessible
    // Authentication.user does not reveal all relevant data
    $http.get('/api/users/me').success(function (res) {
      $scope.user = res;
    }).error(function (err) {
      $scope.error = err.message;
      console.log($scope.error);
    });


    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Get the account menu
    $scope.accountMenu = Menus.getMenu('account').items[0];

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });

    // log out current user
    $scope.logOut = function () {
      $window.location.href ='/api/auth/signout';
    };
  }
]);
