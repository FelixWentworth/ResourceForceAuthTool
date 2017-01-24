angular
	.module('storyGameMaker')
	.component('viewStory', {
		templateUrl: "app/pages/view-story/view-story.html",
		controller: ['$stateParams', 'StoryService', function($stateParams, StoryService) {
			var ctrl = this;

			ctrl.isLoading = true;
			ctrl.story = {};
			
			// private methods
			function onStoryLoaded(story) {
				ctrl.isLoading = false
				ctrl.story = story;
			};

			function getStoryById(storyId) {
				StoryService.getById(storyId).then(onStoryLoaded);
			};

			// init
			getStoryById($stateParams.storyId);
		}]		
	});