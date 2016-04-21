(function () {
  'use strict';

  angular
    .module('forms')    // define the forms module
    .controller('FormsController', FormsController); // attach the FormsController to the forms module

  // inject dependencies for the controller
  // scope is used to link the controller to the view
  // state controls the state of the app
  // Authentication allows basic access to user data
  // FormsService and ApproversService are created services used to communicate Form & Approver data to the database
  // http is used for server requests
  // stateParams is used for maintaining $scope information accross multiple states
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
    //query is from Angular ngResource
    $scope.Forms = FormsService.query();
    $scope.Approvers = ApproversService.query();

    //using $stateParams to get formId from url and then send a get request to database for form with that id
    $scope.viewingForm = FormsService.get({ formId: $stateParams.formId }, function() {

    });

    //  Authentication protection for the list of submitted forms
    if ($state.is('forms.saved-list') && !isAdmin()) {
      $state.go('forms.list');
    }

    //  Non-blocking function to get off of the success page
    // TODO: turn this into a modal/pop-up that has a success message and then have options to return to forms/home page
    if ($state.is('forms.success')) {
        setTimeout(function () {
            console.log('waiting');
            $state.go('home');
        }, 1500);
    }


    // function to submit form information
    $scope.submitForm = function () {
      // capture session variables used for prepoputlation into form object
      $scope.form.last_Name = $scope.user.lastName;
      $scope.form.first_Name = $scope.user.firstName;
      $scope.form.email = $scope.user.email;
      $scope.form.uf_id = $scope.user.ufid;

      // Create new instance of a form
      var NewForm = new FormsService();

      // Current state gives information on the type of form being submitted
      if ($state.is('forms.phd-committee')) {
        $scope.form.formType = 'phd-committee';
      }
      else if ($state.is('forms.phd-plan-of-study')) {
          // do functions for phd plan of study form
        $scope.form.formType = 'phd-planOfStudy';
      }
      // TODO: add more conditions to accomodate other forms such as key-request etc.


      // capture client-side form object as a new instance of a form and save to database
      NewForm.form = $scope.form;
      NewForm.$save(function success(res) { // success callback function
        console.log(res);
        $state.go('forms.success');         // replace this state with a pop-up; see above TODO
      },
      function error(err){  // error callback function
        console.log(err);
      });
    };

    //funtion to delete form from the saved forms list
    //Add pop up to ask if the user is sure they want to delete, and add callback function to confirm successful deletion
    $scope.deleteForm = function (id) {
      //takes the id provided when the function is called and stores it in the scope
      $scope.id = id;

      //issues a get request to the database with the id provided from the saved form view
      $scope.currentForm = FormsService.get({ formId: $scope.id }, function() {
        console.log($scope.currentForm);

        //issues a delete request to the database to delete the selected form
        $scope.currentForm.$delete(function() {
          $state.reload('forms.saved-list');
        });
      });
    };

    // function for authentication purposes, will determine if current user is an admin
    function isAdmin() {
      return $scope.authentication.user.roles.indexOf('admin') > -1;
    }
  }
})();
