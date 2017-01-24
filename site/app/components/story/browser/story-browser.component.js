angular
	.module('storyGameMaker')
	.component('storyBrowser', {
		templateUrl: "app/components/story/browser/story-browser.html",
		controller: ['StoryService', function(StoryService) {
			var ctrl = this;

			ctrl.isLoading = true;
			ctrl.stories = {};

			// private methods
			function onStoriesLoaded(stories) {
					ctrl.isLoading = false;
					ctrl.stories = stories;					
				};

			// init
			StoryService.getStories().then(onStoriesLoaded);
		}]
	});