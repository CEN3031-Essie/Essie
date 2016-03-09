(function () {
  'use strict';

  angular
    .module('gforms.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('gforms', {
        abstract: true,
        url: '/gforms',
        template: '<ui-view/>'
      })
      .state('gforms.list', {
        url: '',
        templateUrl: 'modules/gforms/client/views/list-gforms.client.view.html',
        controller: 'GFormsListController',
        controllerAs: 'vm'
      })
      .state('gforms.create', {
        url: '/create',
        templateUrl: 'modules/json-editor-master/client/views/demo.html'
      })
      .state('gforms.edit', {
        url: '/:gformId/edit',
        templateUrl: 'modules/gforms/client/views/form-gform.client.view.html',
        controller: 'GFormsController',
        controllerAs: 'vm',
        resolve: {
          gformResolve: getGForm
        },
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('gforms.view', {
        url: '/:gformId',
        templateUrl: 'modules/gforms/client/views/view-gform.client.view.html',
        controller: 'GFormsController',
        controllerAs: 'vm',
        resolve: {
          gformResolve: getGForm
        }
      });
  }

  getGForm.$inject = ['$stateParams', 'GFormsService'];

  function getGForm($stateParams, GFormsService) {
    return GFormsService.get({
      gformId: $stateParams.gformId
    }).$promise;
  }

  newGForm.$inject = ['GFormsService'];

  function newGForm(GFormsService) {
    return new GFormsService();
  }
})();
