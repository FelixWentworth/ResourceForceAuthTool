angular
	.module('storyGameMaker')
	.controller('storyPlayer', function($scope, $http){
		$http.get("app/story/demo/story-demo.json")
			.then(function(story){
			$scope.story = story.data;
		});
	});