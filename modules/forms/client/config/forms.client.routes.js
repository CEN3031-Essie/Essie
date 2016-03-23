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
        .state('forms.phd-form', {
            url: '/PhD-Program-Supervisory-Commitee',
            templateUrl: 'modules/forms/client/views/PHD-form.client.view.html'
        });
    }
})();
