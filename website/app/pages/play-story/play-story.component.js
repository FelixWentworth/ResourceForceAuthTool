angular
	.module("storyGameMaker")
	.component("playStory", {
		templateUrl: "pages/play-story/play-story.html",
		bindings: {
			storyId: "<"
		},
		controller: ["StoryStorageService", function(StoryStorageService) {
			var ctrl = this;

			ctrl.loader = new StoryFromIdLoader(StoryStorageService);
			ctrl.isPlayerComplete = false;

			ctrl.$onInit = function() {
				ctrl.loader.load(ctrl.storyId);
			}
		}]
	});