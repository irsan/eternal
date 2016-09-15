var app = angular.module('EternalApp');

app.controller('authCtrl', function($scope, $rootScope, rest) {
    $scope.showLogin = false;
    $scope.showLoading = false;

    $scope.login = function() {
        $scope.showLogin = false;
        $scope.showLoading = true;
        var ref = cordova.InAppBrowser.open(rest.baseURL + '/auth/m/' + device.uuid, '_blank', 'location=yes');
        ref.addEventListener("loadstop", function(event) {
            console.log("LOAD STOP", event);
            if(event.url.match(/.*\/auth\/m\/.+/)) {
                async.waterfall([
                    function(callback) {//get accessToken
                        ref.executeScript({ code : "getAccessToken()" }, function (accessToken) {
                            ref.close();
                            callback(null, accessToken);
                        });
                    },
                    function(accessToken, callback) {// get me
                        //save accessToken
                        $rootScope.accessToken = accessToken;
                        window.localStorage.setItem("accessToken", accessToken);

                        rest.me.get(function(response) {
                            if(response.status == 'Ok') {
                                $rootScope.me = response.data.me;
                                window.localStorage.setItem("me", JSON.stringify(response.data.me));
                            }

                            callback(null, $rootScope.me);
                        });
                    },
                    function(me, callback) {
                        if(me.status == 'new') {
                            window.location.href = '#/setup_profile';
                        } else if(me.status == 'active') {

                        }
                    }
                ]);
            }
        });
    };
    //
    // $scope.getMe = function() {
    //     rest.me.get(function(response) {
    //         console.log("GET ME", response);
    //     });
    // };

    $rootScope.accessToken = window.localStorage.getItem("accessToken");
    console.log("ACCESS TOKEN: ", $rootScope.accessToken);

    if(!$rootScope.accessToken) {
        $scope.showLogin = true;
    } else {
        // $scope.showLogin = true; //TODO: to be removed
        // $scope.getMe();
        $rootScope.me = JSON.parse(window.localStorage.getItem("me"));
        if($rootScope.me.status == 'new') {
            window.location.href = '#/setup_profile';
        } else if($rootScope.me.status == 'active') {

        }
    }
});