angular
	.module("storyGameMaker")
	.component("editStory", {
		templateUrl: "pages/edit-story/edit-story.html",
		bindings: {
			storyId: "<"
		},
		controller: ["StoryStorageService", function(StoryStorageService) {
			var ctrl = this;

			ctrl.loader = new StoryFromIdLoader(StoryStorageService);

			ctrl.$onInit = function() {
				ctrl.loader.load(ctrl.storyId);
			}
		}]
	});