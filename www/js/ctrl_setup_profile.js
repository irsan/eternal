var app = angular.module('EternalApp');

app.controller('setupProfileCtrl', function($scope, $rootScope, rest) {
    console.log("SETUP PROFILE");

    $scope.profileImage = 'img/icons/ic_account_box.svg';

    $scope.takePicture = function() {
        navigator.camera.getPicture(function (imageURI) {
            $scope.profileImage = imageURI;
            $scope.$apply();
        }, function (message) {
            console.log("FALEEEEEEEEEEDDDD", message)
        }, {
            cameraDirection : 1,
            allowEdit : true,
            destinationType : Camera.DestinationType.FILE_URI
        });
    };

    var win = function (r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    }

    var fail = function (error) {
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }

    var options = new FileUploadOptions();
    options.fileKey = "upl";              // this equal to <input type="file" id="upl">
    options.fileName = $scope.profileImage.substr($scope.profileImage.lastIndexOf('/') + 1);
    options.mimeType = "image/jpg";
    options.chunkedMode = false;
    options.params = {'directory' : 'uploads', 'fileName': $scope.profileImage.substr($scope.profileImage.lastIndexOf('/') + 1)};

    var headers = {
        accessToken : $rootScope.accessToken,
        device : JSON.stringify(device)
    };

    options.headers = headers;

    $scope.update = function() {
        var ft = new FileTransfer();
        ft.upload($scope.profileImage, encodeURI(rest.baseURL) + '/m/upload', win, fail, options);
    };

    rest.church.list(function(response) {
        console.log("GOT CHURCHES", response);
    });
});