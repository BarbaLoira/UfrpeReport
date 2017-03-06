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

    //showRow(r.place,r.description,r.base64,r.situacao,r.resposta) 
    $scope.showRow = function (place, description, base64, situacao, resposta) {

        $scope.description = description;
        $scope.resposta = resposta;
        $scope.place = place;
        $scope.situacao = situacao;
        $scope.auxImg = base64;

        var element = document.getElementById('infoTable');
        if(angular.isUndefinedOrNull(resposta)){
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



    $scope.getReports = function () {
        var element = document.getElementById('showLoad');
        element.style.display = 'block';
        $http({ method: 'GET', url: 'http://localhost:8080/reports/reports-total' })
            .then(function successCallback(response) {
                $scope.reports = response.data;
                element.style.display = 'none';


                //console.log(reposnse.status);
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                $scope.alertModal("Não foi possivel carregar dados na tabela de reports");
                element.style.display = 'none';
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    };

    $scope.alertModal = function (description) {
        $scope.Alertdescription = description;
        var element = document.getElementById('alertModal');
        element.style.display = 'block';
    }

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
   /* $scope.showRow = function (description, auxImg, situacao) {
        $scope.description = description;
        $scope.auxImg = auxImg;
        $scope.situacao = situacao;
        var element = document.getElementById('infoTable');
        element.style.display = 'block';
    }*/
     angular.isUndefinedOrNull = function (val) {
        return angular.isUndefined(val) || val === null || val === ""
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
