angular
	.module('storyGameMaker')
	.controller('StoryPlayerCtrl', function($scope, $http){
		$http.get("app/story/demo/story-demo.json")
			.then(function(story){
			$scope.story = story.data;
		});
	});