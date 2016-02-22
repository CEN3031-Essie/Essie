'use strict';

angular.module('core').controller('FormController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
		$scope.forms = [];

		$scope.delete = function(element) {
	  		var index = $scope.forms.indexOf(element);
      		$scope.forms.splice(index, 1);
		};

		$scope.download = function() {
		};

		$scope.newForm = function() {
			var newForm = document.getElementById("myFile");
			$scope.forms.push(newForm);
		};
	}
]);
