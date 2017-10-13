angular
	.module("resourceForceAuthoringTool")
	.component("viewStory", {
		templateUrl: "pages/view-story/view-story.html",
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