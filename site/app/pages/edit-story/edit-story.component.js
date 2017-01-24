angular
	.module('storyGameMaker')
	.component('editStory', {
		templateUrl: "app/pages/edit-story/edit-story.html",
		controller: ['$stateParams', 'StoryService', function($stateParams, StoryService) {
			var ctrl = this;

			ctrl.loader = new StoryFromIdLoader(StoryService);

			// init
			ctrl.loader.load($stateParams.storyId);
		}]
	});