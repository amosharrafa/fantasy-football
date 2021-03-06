'use strict';

cs142App.controller('StandingsController', ['$scope', '$routeParams', '$rootScope', '$resource', '$location', '$route',
	function ($scope, $routeParams, $rootScope, $resource, $location, $route) {	

		var userRes = $resource('/tier2');
		userRes.save({}, function() {}, function errorCheck(err) {});

		var userRes = $resource('/tier1');
		userRes.save({}, function() {}, function errorCheck(err) {});

		var userRes = $resource('/calculate/total_wins');
		userRes.save({}, function() {}, function errorCheck(err) {});

		var userRes = $resource('/calculate/total_points');
		userRes.save({}, function() {}, function errorCheck(err) {});

		var userRes = $resource('/calculate/wins');
		userRes.save({}, function() {}, function errorCheck(err) {});

		var sortURL = "/sort";

		var sortCallback = function(model) {
			$scope.$apply(function () {
				$scope.sorted = model;
			});
		};

		$scope.FetchModel(sortURL, sortCallback);

		$scope.ranks = ['DNQ', '13th', '12th', '11th', '10th', '9th', '8th', '7th', '6th', '5th', '4th', '3rd', '2nd', '1st'];

		$scope.color = function(user, position) {
			return user[position] >= 6 ? 'color: red' : '';
		};

		// attempt to automate, currently never called:

		$scope.scoreboard = [];

	    var scoreboardCallback = function(model) {
	        $scope.$apply(function () {
	        	var matchupPeriodId = parseInt(model['matchupPeriodId']);
	        	$scope.scoreboard[matchupPeriodId] = model['matchups'];
	        	console.log($scope.scoreboard);
	        });
	    };

	    $scope.updateScoreboard = function(week) {
	    	var scoreboardURL = '/scoreboard/' + week;
	    	$scope.FetchModel(scoreboardURL, scoreboardCallback);
	    };

	}
]);