(function () {
    'use strict';

    angular
        .module('forms')
        .controller('FormsController', FormsController);

    FormsController.$inject = ['$scope', '$state', 'Authentication', 'FormsService', 'Form'];

    function FormsController($scope, $state, Authentication, FormsService, Form) {
        $scope.submitForm = function () {
            // function to submit form information
            $scope.form = new Form();
            if ($state.is('forms.phd-committee')) {
                // do functions for phd committee form
                $scope.form.formType = 'phd-committee';
            }

            else if ($state.is('forms.phd-plan-of-study')) {
                // do functions for phd plan of study form
                $scope.form.formType = 'phd-planOfStudy';
            }

            // ETC ETC ETC

            // For testing purposes
            console.log('Form submitted');
            console.log($scope.form);

            $scope.form.$save(function () {
                console.log('saved');
                $state.go('forms.success');
            });
        };
    }
})();
