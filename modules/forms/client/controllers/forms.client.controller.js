(function () {
    'use strict';

    angular
        .module('forms')
        .controller('FormsController', FormsController);

    FormsController.$inject = ['$scope', '$state', 'Authentication'];

    function FormsController($scope, $state, Authentication) {
        $scope.submitForm = function () {
            // function to submit form information
            if ($scope.form.type === 'Phd_Committee')
            {
                // do functions for phd committee form
            }

            else if ($scope.form.type === 'phd_planOfStudy')
            {
                // do functions for phd plan of study form
            }

            // ETC ETC ETC

            // For testing purposes
            console.log('Form submitted');
            console.log($scope.form);
            $state.go('forms.success');
        };
    }
})();
