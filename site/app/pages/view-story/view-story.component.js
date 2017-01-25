angular
	.module('storyGameMaker')
	.component('viewStory', {
		templateUrl: "app/pages/view-story/view-story.html",
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