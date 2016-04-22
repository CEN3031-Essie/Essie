(function () {
  'use strict';

  angular
      .module('forms.services')
      .factory('ApproversService', ApproversService);

  ApproversService.$inject = ['$resource'];

  // look up AngularJS documentation to understand use of $resource
  // AngularJS Documentation: https://docs.angularjs.org/api/ngResource/service/$resource
  // Helpful example: http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/
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
