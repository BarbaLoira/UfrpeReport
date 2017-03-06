//criacao do modulo principal da aplicacao
var app = angular.module('appReport', ['naif.base64']);

//criacao de controlers

app.controller("indexController", function ($scope, $http, $window, $rootScope) {
    $scope.reportUpdate = {
        var: email = "",
        var: description = "",
        var: resposta = "",
        var: place = "",
        var: situacao = "",
        var: filename = "",
        var: auxImg = ""
    };
    $scope.searchparam = {};
    $scope.file = {};
    $scope.reports = [];
    $scope.report = {};
    $scope.user = {};
    $scope.image;
    $scope.description = "";
    $scope.auxImg;
    $scope.situacao = "";
    $scope.resposta = "";
    $scope.filtro = {};
    $scope.LugarFiltrado = "Selecione";
    $scope.SituacaoFiltrado = "Selecione";


    $scope.changeFilter = function () {
        var element = document.getElementById('showLoad');
        element.style.display = 'block';
        $scope.filtro.LugarFiltrado = $scope.LugarFiltrado;
        $scope.filtro.SituacaoFiltrado = $scope.SituacaoFiltrado;
        console.log($scope.filtro);
        $scope.str = $scope.LugarFiltrado + " " + $scope.SituacaoFiltrado;
        $http({ method: 'POST', url: 'http://localhost:8080/personal/filtrar', data: $scope.str })
            .then(function successCallback(response) {
                console.log(response.data);
                $scope.reports = response.data;

                element.style.display = 'none';

            }, function errorCallback(response) {
                console.log(response.data);
                $scope.alertModal("Não foi possivel carregar dados na tabela de reports");
                element.style.display = 'none';
            });



    };



    $scope.getReportsFiltrados = function () {
        var element = document.getElementById('showLoad');
        element.style.display = 'block';
        $http({ method: 'GET', url: 'http://localhost:8080/adm/reports-total' })
            .then(function successCallback(response) {
                $scope.reports = response.data;
                console.log(response.data);
                element.style.display = 'none';

            }, function errorCallback(response) {
                $scope.alertModal("Não foi possivel carregar dados na tabela de reports");
                element.style.display = 'none';
            });

    };

    $scope.alterarSituacao = function (email, description, resposta, place, situacao, filename, auxImg) {

        // $scope.reportUpdate = {};
        $scope.reportUpdate.email = email;
        $scope.reportUpdate.description = description;
        $scope.reportUpdate.resposta = resposta;
        $scope.reportUpdate.place = place;
        $scope.reportUpdate.situacao = situacao;
        $scope.reportUpdate.filename = filename;
        $scope.reportUpdate.auxImg = auxImg;



        $http({ method: 'POST', url: 'http://localhost:8080/adm/updateReport', data: $scope.reportUpdate })
            .then(function successCallback(response) {
                $scope.alertModal("Report atualizado com sucesso.");

            }, function errorCallback(response) {
                $scope.alertModal("Não foi possivel atualizar o report, por favor tente mais tarde.");

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
    //(r.email,r.description,r.resposta,r.place,r.situacao,r.filename,r.base64)
    $scope.showRow = function (place, description, base64, situacao, resposta) {

        $scope.description = description;
        $scope.resposta = resposta;
        $scope.place = place;
        $scope.situacao = situacao;
        $scope.auxImg = base64;

        var element = document.getElementById('infoTable');
        if (angular.isUndefinedOrNull(resposta)) {
            $scope.resposta = "Administrador ainda não respondeu sobre o ocorrido.";
        }
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


    $scope.placeShow = function (str) {
        $scope.report.place = str;

    }
    $scope.getReports = function () {
        var element = document.getElementById('showLoad');
        element.style.display = 'block';
        $http({ method: 'POST', url: 'http://localhost:8080/personal/infoPersonal', data: localStorage.getItem("token") })
            .then(function successCallback(response) {
                $scope.reports = response.data;
                console.log(response.data);
                element.style.display = 'none';

            }, function errorCallback(response) {
                $scope.alertModal("Não foi possivel carregar dados na tabela de reports");
                element.style.display = 'none';
            });

    };



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
    angular.isUndefinedOrNull = function (val) {
        return angular.isUndefined(val) || val === null || val === ""
    }

    $scope.verificarUsuario = function () {


        if (angular.isUndefinedOrNull(localStorage.getItem("token"))) {
            $scope.alertModalLogin("Usuario não autenticado, para acessar nessa pagina é necessario fazer o login.");
            location.href = "index.html";

        }
        else {
            $http({ method: 'POST', url: 'http://localhost:8080/reports/verificarUser', data: localStorage.getItem("token") })
                .then(function successCallback(response) {
                    // $scope.alertModal("Usuario autenticado");

                }, function errorCallback(response) {
                    $scope.alertModalLogin("Usuario nao autenticado");

                });
        }
    };

    $scope.goLeave = function () {

        location.href = "index.html";
    }

    $scope.alertModal = function (description) {
        $scope.Alertdescription = description;
        var element = document.getElementById('alertModal');
        element.style.display = 'block';
    }
    $scope.alertModalLogin = function (description) {
        $scope.Alertdescription = description;
        var element = document.getElementById('alertModalLogin');
        element.style.display = 'block';
    }

    $scope.sair = function () {
        localStorage.setItem("token", "");
    }


    $scope.verificarUsuario();
    $scope.getReports();
});



