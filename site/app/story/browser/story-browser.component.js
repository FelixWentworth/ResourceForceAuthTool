angular
	.module('storyGameMaker')
	.component('storyBrowser', {
		templateUrl: "app/story/browser/story-browser.html",
		controller: ['$scope', 'StoryService', "$log", function($scope, StoryService, $log) {
			$scope.isLoading = true;
			$scope.stories = {};

			StoryService.getStories().then(function(stories) {
					$scope.stories = stories;
					$scope.isLoading = false;
				});
		}]
	});