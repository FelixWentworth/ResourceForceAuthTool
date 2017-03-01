"use strict";

angular.module("story").component("storyTreeCreator", {
	templateUrl: "modules/story/components/tree-creator/story-tree-creator.html",
	controller: ["StoryStorageService", "uuid", function (StoryStorageService, uuid) {
		var ctrl = this;

		ctrl.isLoading = true;

		ctrl.$onInit = function () {
			// todo use promnise
			var storyId = StoryStorageService.getNewStoryId();
			ctrl.isLoading = false;

			var storyId = uuid.v4();
			ctrl.story = new Story(storyId);
			ctrl.story.content.scene.name = "1";
		};
	}]
});
//# sourceMappingURL=story-tree-creator.component.js.map
