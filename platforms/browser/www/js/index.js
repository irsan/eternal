document.addEventListener("deviceready", function() {
    console.log('device is ready.');
    var domElement = document.documentElement;
    angular.bootstrap(domElement, ["EternalApp"]);
    //
    // var $body = angular.element(document.body);
    // var $rootScope = $body.scope().$root;
    // $rootScope.$apply(function () {
    //     $rootScope.$broadcast('initialized', 'initialized');
    // });
});

var app = angular.module('EternalApp', ['ngMaterial', 'ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'tpl/auth.html',
        controller: 'authCtrl'
    }).when('/setup_profile', {
        templateUrl: 'tpl/setup_profile.html',
        controller: 'setupProfileCtrl'
    }).otherwise({
        redirectTo: '/'
    });
});

app.controller('mainCtrl', function($scope, $mdSidenav, $timeout) {
    $scope.toggleLeft = buildDelayedToggler('left');

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
        var timer;
        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
        return debounce(function() {
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                });
        }, 200);
    }

    $scope.goto = function(page) {
        $mdSidenav('left').close();
        window.location.href = "#" + page;
    };
});