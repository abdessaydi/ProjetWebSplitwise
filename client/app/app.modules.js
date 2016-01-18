

(function() {
	'use strict';


	
	angular.module('filters', [])
	angular.module('directives', [])
	angular.module('services', ['ngResource'])
	angular.module('controllers', ['services', 'filters'])

	angular
		.module('appModule', [
			'ui.router',
			'controllers',
			'ui.bootstrap',
			'ngResource',
			'LocalStorageModule',
		])

})();