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
    $scope.cpf;

  //showRow(r.place,r.description,r.base64,r.situacao,r.resposta) 
    $scope.showRow = function (description, base64) {

        $scope.description = description;
       
        $scope.auxImg = base64;
       var element = document.getElementById('infoTable');
     
        if (angular.isUndefinedOrNull(base64)) {
            //  document.getElementById('imgInfoTable').style.visibility = "hidden";
            document.getElementById('validacaoImg').style.visibility = "visible";

        }
        else {

            //   document.getElementById('imgInfoTable').style.visibility = "visible";
            document.getElementById('validacaoImg').style.visibility = "hidden";
        }
       element.style.display = 'block';
    }

    $scope.alertModal = function (description) {
        $scope.Alertdescription = description;
        var element = document.getElementById('alertModal');
        element.style.display = 'block';
    }


    $scope.getUser = function () {
        var element = document.getElementById('showLoad');
        element.style.display = 'block';

        $http({ method: 'POST', url: 'http://localhost:8080/login/getUser', data: $scope.user })
            .then(function successCallback(response) {

                localStorage.setItem("token", response.data.token);
                element.style.display = 'none';
                location.href = "reports.html";

            }, function errorCallback(response) {
                if (angular.isUndefinedOrNull(response.data) || angular.isUndefinedOrNull(response.data.message)) {
                    $scope.alertModal("Não foi possivel logar, por favor tente mais tarde.");

                }
                else {
                    $scope.alertModal(response.data.message);
                }
                element.style.display = 'none';

            });

    };
    angular.isUndefinedOrNull = function (val) {
        return angular.isUndefined(val) || val === null
    }

    $scope.getAdm = function () {
        var element = document.getElementById('showLoad');
        element.style.display = 'block';
        $http({ method: 'POST', url: 'http://localhost:8080/login/getAdm', data: $scope.adm })
            .then(function successCallback(response) {

                localStorage.setItem("token", response.data.token);
                element.style.display = 'none';
                location.href = "adm.html";


            }, function errorCallback(response) {
                if (angular.isUndefinedOrNull(response.data) || angular.isUndefinedOrNull(response.data.message)) {
                    $scope.alertModal("Não foi possivel logar, por favor tente mais tarde.");

                }
                else {
                    $scope.alertModal(response.data.message);
                }
                element.style.display = 'none';
            });

    };

    $scope.getReports = function () {
        var element = document.getElementById('showLoad');
        element.style.display = 'block';
        $http({ method: 'GET', url: 'http://localhost:8080/home/reports-total-nao-resolvido' })
            .then(function successCallback(response) {
                $scope.reports = response.data;
                element.style.display = 'none';

            }, function errorCallback(response) {
                element.style.display = 'none';

            });

    };




    $scope.clearToken = function () {

        localStorage.setItem("token", "");

    };





    $scope.clearToken();
    $scope.getReports();
});


