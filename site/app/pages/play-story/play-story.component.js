angular
	.module('storyGameMaker')
	.component('playStory', {
		templateUrl: "app/pages/play-story/play-story.html",
		bindings: {
			storyId: "<"
		},
		controller: ['StoryService', function(StoryService) {
			var ctrl = this;

			ctrl.loader = new StoryFromIdLoader(StoryService);

			ctrl.$onInit = function() {
				ctrl.loader.load(ctrl.storyId);
			}
		}]
	});