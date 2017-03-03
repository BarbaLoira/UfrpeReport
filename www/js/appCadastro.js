//criacao do modulo principal da aplicacao
var app = angular.module('appReport', []);

//criacao de controlers

app.controller("indexController", function ($scope, $http, $window, $rootScope) {
    $scope.cadastro = {};
    $scope.cpfInvalido = true;
    $scope.pswValidation = "";






    $scope.cadastrar = function () {

        if (angular.isUndefinedOrNull(document.getElementById('name').value)) {
            document.getElementById('validacaoName').style.visibility = "visible";

        }
        else if (angular.isUndefinedOrNull(document.getElementById('txtCPF').value)) {
            document.getElementById('validacaoCpf').style.visibility = "visible";

        }
        else if (angular.isUndefinedOrNull(document.getElementById('email').value)) {
            document.getElementById('validacaoEmail').style.visibility = "visible";

        }
        else if ($scope.cadastro.password == $scope.pswValidation) {
            var element = document.getElementById('showLoad');
            element.style.display = 'block';
            $http({ method: 'POST', url: 'http://localhost:8080/cadastro/user', data: $scope.cadastro })
                .then(function successCallback(response) {



                    $scope.alertModal("Cadastrado com sucesso.");
                    element.style.display = 'none';
                    location.href = "reports.html";



                }, function errorCallback(response) {

                    if (angular.isUndefinedOrNull(response.data) || angular.isUndefinedOrNull(response.data.message)) {

                        $scope.alertModal("Não foi possivel fazer o cadastro, por favor tente mais tarde.");

                    }
                    else {
                        $scope.alertModal(response.data.message);

                    }
                    element.style.display = 'none';
                });

        }
        else {
            document.getElementById('validacaoPsw').style.visibility = "visible";

        }



    };


    angular.isUndefinedOrNull = function (val) {
        return angular.isUndefined(val) || val === null || val === ""
    }

    $scope.validaCPF = function () {

        strCPF = $scope.cadastro.cpf;
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

        if (angular.isUndefinedOrNull(localStorage.getItem("token"))) {
            $scope.alertModal("Usuario não autenticado");
            location.href = "index.html";

        }
        else {
            $http({ method: 'POST', url: 'http://localhost:8080/reports/verificarUser', data: localStorage.getItem("token") })
                .then(function successCallback(response) {
                    window.alert("Usuario autenticado");

                }, function errorCallback(response) {
                    window.alert("Usuario nao autenticado");
                    location.href = "index.html";
                });
        }
    };



    $scope.alertModal = function (description) {
        $scope.Alertdescription = description;
        var element = document.getElementById('alertModal');
        element.style.display = 'block';
    }


    /* //---metodo interessnte
     function pegaObj(id) {
         if (typeof (document.getElementById) != 'undefined')
             return document.getElementById(id);
         else if (document.all) {
             return document.all(id);
         }
     }
 */

});


