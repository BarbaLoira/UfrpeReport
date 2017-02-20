//criacao do modulo principal da aplicacao
var app = angular.module('appReport', ['naif.base64']);

//criacao de controlers

app.controller("indexController", function ($scope, $http, $window, $rootScope) {
    $scope.file = {};
    $scope.reports = [];
    $scope.report = {};
    $scope.user = {};
    $scope.image;
    $scope.description;
    $scope.auxImg;

   


  $scope.getReports = function () {
        $http({ method: 'GET', url: 'http://localhost:8080/reports/reports-total' })
            .then(function successCallback(response) {
                $scope.reports = response.data;

              
                
                //console.log(reposnse.status);
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {

                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    };

    $scope.alterarSituacao = function (r) {



        $http({ method: 'POST', url: 'http://localhost:8080/adm/updateReport', data: r })
            .then(function successCallback(response) {
                window.alert(response.status);
                //console.log(reposnse.status);
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                window.alert(response.data.message);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    }


    $scope.autenticar = function () {
        $http({ method: 'POST', url: 'http://localhost:8080/login/autentication', data: $scope.user })
            .then(function successCallback(response) {
                window.alert(response.status);
                //console.log(reposnse.status);
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                window.alert(response.data.message);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }
    $scope.showRow = function (description, auxImg, situacao) {
        $scope.description = description;
        $scope.auxImg = auxImg;
        $scope.situacao = situacao;
        var element = document.getElementById('id02');
        element.style.display = 'block';
    }

    $scope.placeShow = function (str) {
        $scope.report.place = str;

    }
  
    $scope.saveReport = function () {
        $scope.report.filename = $scope.file.filename;
        $scope.report.base64 = $scope.file.base64;
        $http({ method: 'POST', url: 'http://localhost:8080/reports/insertReport', data: $scope.report })
            .then(function successCallback(response) {
                window.alert(response.status);
                //console.log(reposnse.status);
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                window.alert(response.status);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };

    $scope.getReports();
});



app.controller("inserirReportsController", function () {



});

app.controller("listReportsController", function () {


});

app.controller("loginAdmController", function () {


});
