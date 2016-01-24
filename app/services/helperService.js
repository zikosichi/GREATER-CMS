app.factory('Helper', function(){
	return{
		lightIndicator: function(){
			TweenMax.fromTo(".save-indicator", 1.5, {opacity: 1}, {opacity: 0});
		}
	};
});