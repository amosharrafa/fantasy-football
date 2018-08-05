'use strict';

var cs142App = angular.module('cs142App', ['ngRoute', 'ngMaterial', 'ngResource']);

cs142App.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/users', {
                templateUrl: 'components/user-list/user-listTemplate.html',
                controller: 'UserListController'
            }).
            when('/users/:userId', {
                templateUrl: 'components/user-detail/user-detailTemplate.html',
                controller: 'UserDetailController'
            }).
            when('/standings', {
                templateUrl: 'components/standings/standingsTemplate.html',
                controller: 'StandingsController'
            }).
            otherwise({
                redirectTo: '/standings'
            });
    }]);

cs142App.controller('MainController', ['$scope', '$resource', '$location', '$rootScope', '$http', '$route', '$window',
    function ($scope, $resource, $location, $rootScope, $http, $route, $window) {
        $scope.main = {};

    /*
    * FetchModel - Fetch a model from the web server.
    *   url - string - The URL to issue the GET request.
    *   doneCallback - function - called with argument (model) when the
    *                  the GET request is done. The argument model is the object
    *                  containing the model. model is undefined in the error case.
    */
    $scope.FetchModel = function(url, doneCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200) {
                    doneCallback(JSON.parse(xhr.responseText));
                }   
            }
        };
        xhr.send();
    };

    $scope.viewStandings = function() { 
        $window.location = 'http://localhost:3000/#/standings';
        $window.location.reload();
    };
}]);