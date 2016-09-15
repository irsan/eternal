var app = angular.module('EternalApp');

var API_BASE = "http://192.168.0.172:3000";

app.factory('rest', function($rootScope, $http) {

    var restService = {
        baseURL : API_BASE
    };

    restService.me = {
        get : function(onSuccess) {
            $http.post(restService.baseURL + '/m/me', {
                device : device,
                accessToken : $rootScope.accessToken
            }).then(function(response) {
                onSuccess(response.data);
            }, function(response) {
                //TODO: handle error
                console.log("ERROR in GETTING ME", response);
            });
        }
    };

    restService.church = {
        list : function(onSuccess) {
            console.log("LIST CHURCH ACCESS TOKEN", $rootScope.accessToken);
            $http.post(restService.baseURL + '/m/churches', {
                device : device,
                accessToken : $rootScope.accessToken
            }).then(function(response) {
                onSuccess(response.data);
            }, function(response) {
                //TODO: handle error
                console.log("ERROR in LISTING CHURCHES", response);
            });
        }
    };

    return restService;
});