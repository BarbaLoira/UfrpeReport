app.controller("admController", function ($scope, $http, $window, $rootScope) {
    $scope.file = {};
    $scope.reports = [];
    $scope.report = {};
    $scope.user = {};
    $scope.image;
    $scope.description;
    $scope.auxImg;


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
    $scope.showRow = function (description, auxImg) {
        $scope.description = description;
        $scope.auxImg = auxImg;
        var element = document.getElementById('id01');
        element.style.display = 'block';
    }

    $scope.placeShow = function (str) {
        $scope.report.place = str;

    }
    $scope.getReports = function () {
        $http({ method: 'GET', url: 'http://localhost:8080/reports/reports-total' })
            .then(function successCallback(response) {
                $scope.reports = response.data;
                console.log(response.data);
                //console.log(reposnse.status);
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {

                // called asynchronously if an error occurs
                // or server returns response with an error status.
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

    $scope.getReports();
});
