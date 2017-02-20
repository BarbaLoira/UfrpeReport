//Criacao do modulo principal da aplicacao
var appCliente = angular.module("appReport", [ "ngRoute", "naif.base64" ]);

appCliente.config (function($httpProvider){
	$httpProvider.interceptors.push("tokenInterceptor");
});

appCliente.controller("mainController", function($scope, $http, $location,
		$route, $routeParams, $window, $rootScope) {

	$scope.$location = $location;
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
	$scope.$location = $location;
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;

	$scope.file = {};
	$scope.reports = [];
	$scope.report = {};
	$scope.user = {};
	$scope.image;
	$scope.description;
	$scope.auxImg;
	$scope.token;
	/*
	 * $scope.callBackValidaCpf; function validaCpf(cpf) { var Soma; var Resto;
	 * Soma = 0; if (strCPF == "00000000000") return false;
	 * 
	 * for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1,
	 * i)) * (11 - i); Resto = (Soma * 10) % 11;
	 * 
	 * if ((Resto == 10) || (Resto == 11)) Resto = 0; if (Resto !=
	 * parseInt(strCPF.substring(9, 10))) return false;
	 * 
	 * Soma = 0; for (i = 1; i <= 10; i++) Soma = Soma +
	 * parseInt(strCPF.substring(i - 1, i)) * (12 - i); Resto = (Soma * 10) %
	 * 11;
	 * 
	 * if ((Resto == 10) || (Resto == 11)) Resto = 0; if (Resto !=
	 * parseInt(strCPF.substring(10, 11))) return false; return true; }
	 */
	$scope.saveReport = function() {
		$scope.report.filename = $scope.file.filename;
		$scope.report.base64 = $scope.file.base64;
		console.log($scope.report.base64);
		console.log($scope.report.description);
		console.log($scope.report.email);
		console.log($scope.report.name);
		console.log($scope.report.cpf);
		window.alert();
		$http({
			method : "POST",
			url : "/reports/insertReport",
			data : $scope.report
		}).then(function successCallback(response) {
			window.alert(response.status);
			// console.log(reposnse.status);
			// this callback will be called asynchronously
			// when the response is available
		}, function errorCallback(response) {
			window.alert(response.status);
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	};

	$scope.getReports = function() {
		$scope.token = localStorage.getItem("userToken");
		$http.defaults.headers.common.Authorization = $scope.token;
		$http({
			method : "GET",
			url : "/reports/reports-total"
		}).then(function successCallback(response) {
			console.log(response.data);
			$scope.reports = response.data;
			console.log(response.data);
			// console.log(reposnse.status);
			// this callback will be called asynchronously
			// when the response is available
		}, function errorCallback(response) {

			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});

	};

	$scope.autenticar = function() {
		$http({
			method : "POST",
			url : "/login/autentication",
			data : $scope.user
		}).then(function successCallback(response) {
			localStorage.setItem("userToken", response.data.token);
			$http.defaults.headers.common.Authorization = response.data.token;
			token = localStorage.getItem("userToken");
			
		//	$http.defaults.headers.common.Authorization = 'Bearer '+$scope.token;
		//	console.log($http.defaults.headers.common.Authorization);
			location.href = "/adm";
		
		}, function errorCallback(response) {
		
		});
	}

	$scope.showRow = function(description, auxImg) {
		$scope.description = description;
		$scope.auxImg = auxImg;
		var element = document.getElementById("id01");
		element.style.display = "block";
	}

	$scope.placeShow = function(str) {
		$scope.report.place = str;

	}
	$scope.getHeader = function() {
		console.log("token");
		console.log(localStorage);
	}
	$scope.getReports();
	$scope.getHeader();

});

appCliente.config(function($routeProvider, $locationProvider) {

	/*
	 * $routeProvider .when("/home", { templateUrl : 'view/index.html',
	 * controller : 'indexController' }).when("/adm", { templateUrl :
	 * 'view/adm.html', controller : 'indexController' }).otherwise({ rediretTo :
	 * '/' });
	 */
	$locationProvider.html5Mode(true);

});
