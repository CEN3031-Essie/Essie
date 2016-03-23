(function () {
    'use strict';

    angular.module('forms').controller('FormsListController', FormsListController);

    FormsListController.$inject = ['$scope', '$state', 'Authentication'];

    function FormsListController($scope, $state, Authentication) {
        $scope.authentication = Authentication;
        if (!$scope.authentication.user) {
            $state.go($state.previous.state.name || 'home', $state.previous.params);
        }
    }
})();
