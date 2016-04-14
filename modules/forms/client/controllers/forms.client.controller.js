(function () {
  'use strict';

  angular
    .module('forms')
    .controller('FormsController', FormsController);

  FormsController.$inject = ['$scope', '$state', 'Authentication', 'FormsService', 'ApproversService', '$http', '$stateParams'];

  function FormsController($scope, $state, Authentication, FormsService, ApproversService, $http, $stateParams) {
    $scope.authentication = Authentication;

    // Makes current user object accessible
    $http.get('/api/users/me').success(function (res) {
      $scope.user = res;
    }).error(function (err) {
      $scope.error = err.message;
      console.log($scope.error);
    });

    //fetchs saved forms & approvers from database
    $scope.Forms = FormsService.query();
    $scope.Approvers = ApproversService.query();

    //using $stateParams to get formId from url and then send a get request to database for form with that id
    $scope.viewingForm = FormsService.get({ formId: $stateParams.formId }, function() {
    
    });

    $scope.authentication = Authentication;

    //  Authentication protection for the list of submitted forms
    if ($state.is('forms.saved-list') && !isAdmin()) {
      $state.go('forms.list');
    }

    //  Non-blocking function to get off of the success page
    if ($state.is('forms.success')) {
        setTimeout(function () {
            console.log('waiting');
            $state.go('home');
        }, 1500);
    }


    // function to submit form information
    $scope.submitForm = function () {
      $scope.form.last_Name = $scope.user.lastName;
      $scope.form.first_Name = $scope.user.firstName;
      $scope.form.email = $scope.user.email;
      $scope.form.uf_id = $scope.user.ufid;

      // Create new instance of a form
      var NewForm = new FormsService();

      // Gives information on the type of form being submitted
      if ($state.is('forms.phd-committee')) {
        $scope.form.formType = 'phd-committee';
      }
      else if ($state.is('forms.phd-plan-of-study')) {
          // do functions for phd plan of study form
        $scope.form.formType = 'phd-planOfStudy';
      }
      // TODO: add more conditions to accomodate other forms

      NewForm.form = $scope.form;
      NewForm.$save(function success(res) {
        console.log(res);
        $state.go('forms.success');
      },
      function error(err){
        console.log(err);
      });
    };

    $scope.viewForm = function (id) {
      $scope.id = id;
      $scope.currentForm = FormsService.get({ formId: $scope.id }, function() {
        console.log($scope.currentForm);
        $state.go('forms.view-form');
      });
    };

    $scope.deleteForm = function (id) {
      $scope.id = id;
      $scope.currentForm = FormsService.get({ formId: $scope.id }, function() {
        console.log($scope.currentForm);

        $scope.currentForm.$delete(function() {
          $state.reload('forms.saved-list');
        });
      });
    };

    function isAdmin() {
      return $scope.authentication.user.roles.indexOf('admin') > -1;
    }
  }
})();
