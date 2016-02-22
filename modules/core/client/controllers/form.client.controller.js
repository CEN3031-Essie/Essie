'use strict';

angular.module('core').controller('FormController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
		$scope.forms = [{ code: 'aaa', name: 'test' },
						{ code: 'bbb', name: 'test2' }
		];


		// Changes XML to JSON
		$scope.xmlToJson = function(xml) {
		};
	}
]);
