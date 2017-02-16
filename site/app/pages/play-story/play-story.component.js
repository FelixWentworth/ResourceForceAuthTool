angular
	.module("storyGameMaker")
	.component("playStory", {
		templateUrl: "pages/play-story/play-story.html",
		bindings: {
			storyId: "<"
		},
		controller: ["StoryService", function(StoryService) {
			var ctrl = this;

			ctrl.loader = new StoryFromIdLoader(StoryService);
			ctrl.isPlayerComplete = false;

			ctrl.$onInit = function() {
				ctrl.loader.load(ctrl.storyId);
			}
		}]
	});