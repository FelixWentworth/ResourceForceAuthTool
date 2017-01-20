angular
	.module('storyGameMaker')
	.component('storyBrowser', {
		controller: function($scope, StoryCache){
			$scope.awaitingLoad = StoryCache.getIsLoading();
			$scope.storyPreviews = StoryCache.getPreviewList();
		}
	});