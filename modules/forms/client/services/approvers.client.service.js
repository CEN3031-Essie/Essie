(function () {
  'use strict';

  angular
      .module('forms.services')
      .factory('ApproversService', ApproversService);

  ApproversService.$inject = ['$resource'];

  function ApproversService($resource) {
    return $resource('api/approvers/:approverId', {
      approverId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
