'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus', '$http',
  function ($scope, $state, Authentication, Menus, $http) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Redirect to user signin if not signed in
    if (!$state.includes('home') && !$scope.authentication.user){
      $state.go('authentication.signin');
    }

    $http.get('/api/users/me').success(function (res) {
        console.log(res.data);
        $scope.user = res.data;
    }).error(function (err) {
        console.log('Error');
        $scope.error = err.message;
        console.log($scope.error);
    });

    console.log($scope.user);

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
  }
]);
