//Criacao do modulo principal da aplicacao
var appCliente = angular.module("appReport", [ "ngRoute", "naif.base64" ]);

appCliente.config(function($httpProvider) {
	$httpProvider.interceptors.push("tokenInterceptor");
});

appCliente.controller("mainController", function($scope, $http, $location,
		$route, $routeParams, $window, $rootScope) {

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
/*
	$scope.callBackValidaCpf;
	function validaCpf(cpf) {
		var Soma;
		var Resto;
		Soma = 0;
		if (strCPF == "00000000000")
			return false;

		for (i = 1; i <= 9; i++)
			Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
		Resto = (Soma * 10) % 11;

		if ((Resto == 10) || (Resto == 11))
			Resto = 0;
		if (Resto != parseInt(strCPF.substring(9, 10)))
			return false;

		Soma = 0;
		for (i = 1; i <= 10; i++)
			Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
		Resto = (Soma * 10) % 11;

		if ((Resto == 10) || (Resto == 11))
			Resto = 0;
		if (Resto != parseInt(strCPF.substring(10, 11)))
			return false;
		return true;

	}
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
			url : "http://localhost:8080/reports/insertReport",
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
		$http({
			method : "GET",
			url : "http://localhost:8080/reports/reports-total"
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
			url : "http://localhost:8080/login/autentication",
			data : $scope.user
		}).then(function successCallback(response) {
			window.alert(response.status);
			// console.log(reposnse.status);
			// this callback will be called asynchronously
			// when the response is available
		}, function errorCallback(response) {
			window.alert(response.data.message);
			// called asynchronously if an error occurs
			// or server returns response with an error status.
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
	$scope.getReports();
});
