angular
	.module("storyGameMaker")
	.component("editStory", {
		templateUrl: "app/pages/edit-story/edit-story.html",
		bindings: {
			storyId: "<"
		},
		controller: ["StoryService", function(StoryService) {
			var ctrl = this;

			ctrl.loader = new StoryFromIdLoader(StoryService);

			ctrl.$onInit = function() {
				ctrl.loader.load(ctrl.storyId);
			}
		}]
	});