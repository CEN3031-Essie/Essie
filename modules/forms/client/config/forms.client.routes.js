(function () {
    'use strict';

    angular
        .module('forms.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
        .state('forms', {
            abstract: true,
            url: '/forms',
            template: '<ui-view/>'
        })
        .state('forms.list', {
            url: '',
            templateUrl: 'modules/forms/client/views/list-forms.client.view.html',
            controller: 'FormsListController',
        })
        .state('forms.success', {
            url: '/success',
            templateUrl: 'modules/forms/client/views/form-submission-success.client.view.html'
        })
        .state('forms.phd-committee', {
            url: '/PhD-Program-Supervisory-Commitee',
            templateUrl: 'modules/forms/client/views/PHD-form.client.view.html',
            controller: 'FormsController'
        })
        .state('forms.phd-plan-of-study', {
            url: '/PhD-Plan-of-Study',
            templateUrl: 'modules/forms/client/views/POS-form.client.view.html',
            controller: 'FormsController'
        })
        .state('forms.key_request-form', {
            url: '/Key-Approval-and-Building-Access-Request',
            templateUrl: 'modules/forms/client/views/Key_Request-form.client.view.html',
            controller: 'FormsController'
        });
    }
})();
