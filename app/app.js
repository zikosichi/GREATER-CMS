var app = angular.module('greaterCMS', ['ui.router', 'firebase'])

.config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('levels', {
			url: '/levels',
			templateUrl: 'app/levels/levels.html',
			controller: 'levelsController as vm',
		})
		.state('questionbank', {
			url: '/questionbank',
			templateUrl: 'app/questionbank/questionbank.html',
			controller: 'questionbankController as vm'
		});

	$urlRouterProvider.otherwise('/levels');

}]);
