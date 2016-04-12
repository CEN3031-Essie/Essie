(function () {
    'use strict';

    angular
        .module('forms')
        .controller('FormsController', FormsController);

    FormsController.$inject = ['$scope', '$state', 'Authentication', 'FormsService', '$http'];

    function FormsController($scope, $state, Authentication, FormsService, $http) {

        //  Make current user accessible in $scope.user
        $http.get('/api/users/me').success(function (res) {
            $scope.user = res;
            console.log($scope.user);
        }).error(function (err) {
            console.log('Error');
            $scope.error = err.message;
            console.log($scope.error);
        });

        //fetchs saved forms from database
        $scope.Forms = FormsService.query();

        $scope.authentication = Authentication;

        if ($state.is('forms.saved-list') && !isAdmin()) {
            $state.go('forms.list');
        }

        // function to submit form information
        $scope.submitForm = function () {
            var NewForm = new FormsService();
            if ($state.is('forms.phd-committee')) {
                // do functions for phd committee form
                $scope.form.formType = 'phd-committee';
            }

            else if ($state.is('forms.phd-plan-of-study')) {
                // do functions for phd plan of study form
                $scope.form.formType = 'phd-planOfStudy';
            }

            console.log($scope.Forms);

            NewForm.form = $scope.form;
            NewForm.$save(function success(res) {
                console.log('saved');
                console.log(res);
                $state.go('forms.success');
            },
            function error(err){
                console.log(err);
            });
        };

        //returns boolean of whether user is an admin or not
        function isAdmin() {
            return $scope.authentication.user.roles.indexOf('admin') > -1;
        }
    }
})();
