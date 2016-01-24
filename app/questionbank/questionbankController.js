app.controller('questionbankController', ['$scope', '$firebaseObject', '$firebaseArray', '$timeout', 'Helper',
function($scope, $firebaseObject, $firebaseArray, $timeout, Helper){


	var ref = new Firebase("https://greatr.firebaseio.com/bank");
	$scope.bank = $firebaseArray(ref);


	//GET TYPES AS AN ARRAY
	// var list = getAsArray(ref);
	// console.log(list);		

	$scope.bank.$loaded().then(function(){
		console.log($scope.bank);
		$scope.currentType = $scope.bank['0'];
	});



	// TYPES 
	$scope.currentType = [];

	$scope.selectType = function(type){
		$scope.currentType = type;
	};

	$scope.saveType = function(type){
		$scope.bank.$save(type).then(function(){
			Helper.lightIndicator();
		});
	};

	$scope.addNewType = function(){
		$scope.bank.push({
			type: "Type Name",
			questions: []
		});
		$scope.bank.$save($scope.bank);
	};

	$scope.removeType = function(type){
		var r = confirm("Are you sure?!");
		if (r === true) {
			$scope.bank.$remove(type);
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
		$scope.currentType.questions.unshift(newQuestion);
	};

	$scope.saveQuestions = function(){
		$scope.bank.$save($scope.currentType).then(function(){
			Helper.lightIndicator();
		});
	};

	$scope.removeQuestion = function(index){
		$scope.currentType.questions.splice(index, 1);
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

	

}]);
