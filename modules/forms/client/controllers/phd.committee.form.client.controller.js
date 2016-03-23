(function () {
    'use strict';

    angular
        .module('forms')
        .controller('PhdCommitteeFormController', PhdCommitteeFormController);

    PhdCommitteeFormController.$inject = ['$scope', '$state', 'Authentication'];

    function PhdCommitteeFormController($scope, $state, Authentication) {
        function submitForm() {
            // function to submit form information
        }
    }
})();
