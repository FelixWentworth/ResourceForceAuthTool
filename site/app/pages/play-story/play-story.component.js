angular
	.module('storyGameMaker')
	.component('playStory', {
		templateUrl: "app/pages/play-story/play-story.html",
		controller: ['$stateParams', 'StoryService', function($stateParams, StoryService) {
			var ctrl = this;

			ctrl.loader = new StoryFromIdLoader(StoryService);

			// init
			ctrl.loader.load($stateParams.storyId);
		}]
	});