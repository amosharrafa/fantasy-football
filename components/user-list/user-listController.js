'use strict';


cs142App.controller('UserListController', ['$scope', '$route',
    function ($scope, $route) {

      var listURL = "/user/list";
      
      var listCallback = function(model) {
          $scope.$apply(function () {
              $scope.userList = model;
          });
      };

      $scope.FetchModel(listURL, listCallback);

    }
]);