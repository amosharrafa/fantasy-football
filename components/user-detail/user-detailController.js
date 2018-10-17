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

    $scope.increment = function(key, amount) {
      var userRes = $resource('/increment/' + $routeParams.userId + '/' + key + '/' + amount);
      userRes.save({}, function(user) {}, function errorCheck(err) {});
      $route.reload();
    };

    $scope.update = function(week) {
      var label = week['label'];
      var amount = week['amount'];
      var userRes = $resource('/update/' + $routeParams.userId + '/' + label + '/' + amount);
      userRes.save({}, function(user) {}, function errorCheck(err) {});
      $route.reload();
    };

    $scope.ranks = {
      0: 'DNQ',
      7: '6th', 
      8: '5th', 
      9: '4th', 
      10: '3rd', 
      11: '2nd', 
      12: '1st'
    };

    var setWeeks = function(min, max, step){
      step = step || 1;
      for (var i = min; i <= max; i += step) {
        var week = {
          number: i,
          label: "week" + i
        }
        $scope.weeks.push(week);
      }
    };

    $scope.weeks = [];
    setWeeks(1, 17);

  }
]);