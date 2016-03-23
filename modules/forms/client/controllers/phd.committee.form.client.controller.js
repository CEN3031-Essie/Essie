(function () {
    'use strict';

    angular
        .module('forms')
        .controller('FormController', FormController);

    FormController.$inject = ['$scope', '$state', 'Authentication'];

    function FormController($scope, $state, Authentication) {
        function submitForm() {
            // function to submit form information
        }
    }
})();
