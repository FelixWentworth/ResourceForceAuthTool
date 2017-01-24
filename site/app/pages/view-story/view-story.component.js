angular
	.module('storyGameMaker')
	.component('viewStory', {
		templateUrl: "app/pages/view-story/view-story.html",
		controller: ['$stateParams', 'StoryService', function($stateParams, StoryService) {
			var ctrl = this;

			ctrl.loader = new StoryFromIdLoader(StoryService);

			// init
			ctrl.loader.load($stateParams.storyId);
		}]		
	});