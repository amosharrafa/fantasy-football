'use strict';

cs142App.controller('UserDetailController', ['$scope', '$routeParams', '$resource', '$location', '$rootScope', '$http', '$route',
  function ($scope, $routeParams, $resource, $location, $rootScope, $http, $route) {

    var detailURL = '/user/' + $routeParams.userId;

    var detailCallback = function(model) {
        $scope.$apply(function () {
          $scope.user = model;
        });
    };

    $scope.FetchModel(detailURL, detailCallback);

    $scope.$on($scope.main.currID, function(event) {
        $scope.FetchModel(detailURL, detailCallback);
    });

    $scope.increment = function(toInc, amount) {
      var userRes = $resource('/increment/' + $routeParams.userId + '/' + toInc + '/' + amount);
      userRes.save({}, function(user) {}, function errorCheck(err) {});
      $route.reload();
    };

    $scope.ranks = ['DNQ', 'DNQ', 'DNQ', 'DNQ', 'DNQ', '6th', '5th', '4th', '3rd', '2nd', '1st'];

  }
]);