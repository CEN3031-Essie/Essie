(function () {
  'use strict';

  angular
      .module('forms.routes')
      .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  // establish routes pertaining forms module
  function routeConfig($stateProvider) {
    $stateProvider
    .state('forms', {   // abstract parent view for the module
      abstract: true,
      url: '/forms',
      template: '<ui-view/>'
    })
    .state('forms.list', {
      url: '',
      templateUrl: 'modules/forms/client/views/list-forms.client.view.html',
      controller: 'FormsListController',
    })
    .state('forms.saved-list', {
      url: '/saved-forms-list',
      templateUrl: 'modules/forms/client/views/saved-forms-list.client.view.html',
      controller: 'FormsController',
    })
    .state('forms.view-form', {
      url: '/:formId/view',
      templateUrl: 'modules/forms/client/views/view-form.client.view.html',
      controller: 'FormsController',
    })
    .state('forms.success', {
      url: '/success',
      templateUrl: 'modules/forms/client/views/form-success.client.view.html',
      controller: 'FormsController'
    })
    .state('forms.phd-committee', {
      url: '/PhD-Program-Supervisory-Commitee',
      templateUrl: 'modules/forms/client/views/phd-committee.client.view.html',
      controller: 'FormsController'
    })
    .state('forms.phd-plan-of-study', {
      url: '/PhD-Plan-of-Study',
      templateUrl: 'modules/forms/client/views/phd-planOfStudy.client.view.html',
      controller: 'FormsController'
    })
    .state('forms.key-request', {
      url: '/Key-Approval-and-Building-Access-Request',
      templateUrl: 'modules/forms/client/views/key-request.client.view.html',
      controller: 'FormsController'
    })
    .state('forms.graduate-scholarship', {
      url: '/Graduate-Scholarship-Application',
      templateUrl: 'modules/forms/client/views/graduate-scholarship.client.view.html',
      controller: 'FormsController'
    });
  }
})();
