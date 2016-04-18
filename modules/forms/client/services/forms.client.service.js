(function () {
  'use strict';

  angular
      .module('forms.services')
      .factory('FormsService', FormsService);

   //look up AngularJS documentation for use of $resource
  FormsService.$inject = ['$resource'];

  function FormsService($resource) {
    return $resource('api/forms/:formId', {
      formId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
