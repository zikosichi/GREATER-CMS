app.controller('questionbankController', ['$scope', '$firebaseObject', '$firebaseArray', '$timeout', 'Helper',
function($scope, $firebaseObject, $firebaseArray, $timeout, Helper){


	var ref = new Firebase("https://greatr.firebaseio.com/bank");
	$scope.bank = $firebaseObject(ref);


	$scope.bank.$loaded().then(function(){
		if (!$scope.bank.types) {
			$scope.bank.types = [];
			saveAll();
		}
		$scope.currentType = $scope.bank.types[$scope.currentTypeIndex];
	});

	// TYPES 
	$scope.currentType = [];
	$scope.currentTypeIndex = 0;

	$scope.selectType = function(index){
		$scope.currentTypeIndex = index;
		$scope.currentType = $scope.bank.types[index];
	};

	$scope.saveType = function(){
		saveAll();
		$scope.toggleTypeEdiging();
	};

	$scope.addNewType = function(){
		$scope.bank.types.push({
			type: "Type Name",
			questions: []
		});
		saveAll();
	};

	$scope.removeType = function(index){
		var r = confirm("Are you sure?!");
		if (r === true) {
			$scope.bank.types.splice(index, 1);
			saveAll();
		}
	};

	$scope.toggleTypeEdiging = function(){
		$scope.typeEditing = !$scope.typeEditing;
	};




	// TYPE QUESTIONS
	$scope.addNewQuestion = function(){
		var newQuestion = [
			{
				"text" : "0",
				"value" : 0
			},
			{
				"text" : "0",
				"value" : 0
			}
		];
		if (!$scope.currentType.questions) {
			$scope.currentType.questions = [];
		}
		$scope.currentType.questions.unshift(newQuestion);
		saveAll();
	};

	$scope.saveQuestions = function(){
		saveAll();
	};

	$scope.removeQuestion = function(index){
		$scope.currentType.questions.splice(0, 1);
		saveAll();
	};

	$scope.uploadImage = function(files, question, qIdx){
		var reader = new FileReader();
		reader.onload = function(e){
			question[qIdx].img = e.target.result;
			$scope.$digest();
		};
		reader.readAsDataURL(files[0]);
	};

	$scope.removeImage = function(question, qIdx){
		question[qIdx].img = null;
		delete question[qIdx].img;
	};

	function saveAll(){
		$scope.bank.$save($scope.bank.types).then(function(){
			$scope.currentType = $scope.bank.types[$scope.currentTypeIndex];
			Helper.lightIndicator();
		});
	}

	

}]);
