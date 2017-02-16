//Criacao do modulo principal da aplicacao
var appCliente = angular.module("appCliente", [ 'ngRoute', 'naif.base64' ]);

appCliente.config(function($routeProvider, $locationProvider) {

	$routeProvider.when("/home", {
		templateUrl : 'view/home.html',
		controller : 'homeController'
	}).when("/", {
		templateUrl : 'view/home.html',
		controller : 'homeController'
	}).when("/adm", {
		templateUrl : 'view/adm.html',
		controller : 'admController'
	}).otherwise({
		rediretTo : '/home'
	});

	$locationProvider.html5Mode(true);

});

appCliente.config(function($httpProvider) {
	$httpProvider.interceptors.push("tokenInterceptor");
});
