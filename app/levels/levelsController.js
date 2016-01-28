app.controller('levelsController', ['$scope', '$http', '$firebaseObject', '$firebaseArray', 'Helper',
function($scope, $http, $firebaseObject, $firebaseArray, Helper){

	var ref = new Firebase("https://greatr.firebaseio.com/levels");
	$scope.data = $firebaseObject(ref);

	$scope.data.$loaded().then(function(){
		$scope.levels = $scope.data.levels;
	});


	$scope.loadTags = function(query) {
		return tags.load();
	};

	$scope.addNewLevel = function(){
		$scope.levels.push({
			"id" : $scope.levels[$scope.levels.length - 1].id + 1,
			"name" : "",
			"questionsFrom" : [],
			"maxScore" : "",
			"currentScore" : 0,
			"status" : "locked"
		});
	};

	$scope.saveLevels = function(){
		save();
	};


	function save(){
		$scope.data.$save($scope.data.levels).then(function(){
			$scope.levels = $scope.data.levels;
			Helper.lightIndicator();
		});
	}


}]);