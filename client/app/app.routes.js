// ROUTES FILE
(function(){
	'use strict'

	 angular
		.module('appModule')
		.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider){

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('login', {
				url: '/login',
			    templateUrl: 'app/components/signup/signupView.html',
			    controller: 'signupController'
			})

			.state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'app/components/dashboard/dashboardView.html',
                    controller: 'DashboardController'
            
            })
            .state('expenses', {
                    url: '/expenses',
                    templateUrl: 'app/components/expenses/billView.html',
                    controller: 'BillController'
            
            })
		}])
})();