//criacao do modulo principal da aplicacao
var app = angular.module('appReport', ['naif.base64']);

//criacao de controlers

app.controller("indexController", function ($scope, $http, $window, $rootScope) {
    $scope.report = {};
    $scope.file = {};
    $scope.cpfInvalido = true;
    $scope.pswValidation = "";





    $scope.placeShow = function (str) {
        $scope.report.place = str;

    }

    $scope.save = function () {


        if (angular.isUndefinedOrNull(document.getElementById('description').value)) {
            document.getElementById('validacaoDescription').style.visibility = "visible";

        }
        else if (angular.isUndefinedOrNull($scope.report.place)) {
            $scope.alertModal("Selecione o local onde ocorreu o fato");
        }
        else {
            document.getElementById('validacaoDescription').style.visibility = "hidden";
            var element = document.getElementById('showLoad');
            element.style.display = 'block';
            $scope.report.filename = $scope.file.filename;
            $scope.report.base64 = $scope.file.base64;
            $http({ method: 'POST', url: 'http://localhost:8080/reports/insertReport', data: $scope.report })
                .then(function successCallback(response) {
                    document.getElementById('description').value = null;
                    $scope.report.place = "";
                    document.getElementById('iptImg').value = null;
                   $scope.file = {};
                    $scope.alertModal("Report salvo com sucesso.");
                    element.style.display = 'none';

                }, function errorCallback(response) {

                    if (angular.isUndefinedOrNull(response.data) || angular.isUndefinedOrNull(response.data.message)) {

                        $scope.alertModal("Não foi possivel fazer o report, por favor tente mais tarde.");

                    }
                    else {
                        $scope.alertModal(response.data.message);

                    }
                    element.style.display = 'none';
                });


        }



    };


    angular.isUndefinedOrNull = function (val) {
        return angular.isUndefined(val) || val === null || val === ""
    }

    $scope.validaCPF = function () {

        strCPF = $scope.report.cpf;
        strCPF = strCPF.replace(/[^\d]+/g, '');
        var Soma;
        var Resto;
        var cboll = true;
        Soma = 0;

        if (strCPF.length != 11 ||
            strCPF == "00000000000" ||
            strCPF == "11111111111" ||
            strCPF == "22222222222" ||
            strCPF == "33333333333" ||
            strCPF == "44444444444" ||
            strCPF == "55555555555" ||
            strCPF == "66666666666" ||
            strCPF == "77777777777" ||
            strCPF == "88888888888" ||
            strCPF == "99999999999")
            cboll = false;


        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) cboll = false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) cboll = false;

        if (!cboll) {

            document.getElementById('validacaoCpf').style.visibility = "visible";
            $scope.cpfInvalido = true;
        }
        else {
            document.getElementById('validacaoCpf').style.visibility = "hidden";
            $scope.cpfInvalido = false;
        }

    }


    $scope.verificarUsuario = function () {


        if (localStorage.getItem("token") == "") {

            $scope.alertModalLogin("Usuario não autenticado, para entrar nessa pagina é necessario fazer o login.");


        }
        else {
            $http({ method: 'POST', url: 'http://localhost:8080/reports/verificarUser', data: localStorage.getItem("token") })
                .then(function successCallback(response) {

                    $scope.report.email = response.data.email;
                }, function errorCallback(response) {

                    $scope.alertModalLogin("Usuario não autenticado, para entrar nessa pagina é necessario fazer o login.");

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

    $scope.verificarUsuario();


});


