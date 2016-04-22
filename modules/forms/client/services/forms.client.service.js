(function () {
  'use strict';

  angular
      .module('forms.services')
      .factory('FormsService', FormsService);

  // look up AngularJS documentation to understand use of $resource
  // AngularJS Documentation: https://docs.angularjs.org/api/ngResource/service/$resource
  // Helpful example: http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/
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
