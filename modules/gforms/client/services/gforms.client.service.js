(function () {
  'use strict';

  angular
    .module('gforms.services')
    .factory('GFormsService', GFormsService);

  GFormsService.$inject = ['$resource'];

  function GFormsService($resource) {
    return $resource('api/gforms/:gformId', {
      gformId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
