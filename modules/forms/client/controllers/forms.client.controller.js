(function () {
    'use strict';

    angular
        .module('forms')
        .controller('FormsController', FormsController);

    FormsController.$inject = ['$scope', '$state', 'Authentication'];

    function FormsController($scope, $state, Authentication) {
        $scope.submitForm = function () {
            // function to submit form information
            console.log($state.$current.name);
            if ($scope.is('forms.phd-committee')) {
                // do functions for phd committee form
                $scope.form.formType = 'phd-committee';
            }

            // else if ($scope.is('forms.phd-plan-of-study')) {
            //     // do functions for phd plan of study form
            //     $scope.form.formType = 'phd-planOfStudy';
            // }

            // ETC ETC ETC

            // For testing purposes
            console.log('Form submitted');
            console.log($scope.form);
            $state.go('forms.success');
        };
    }
})();
