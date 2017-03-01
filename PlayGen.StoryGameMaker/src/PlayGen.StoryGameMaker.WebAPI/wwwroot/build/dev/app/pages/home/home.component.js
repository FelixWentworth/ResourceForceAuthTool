"use strict";

angular.module("storyGameMaker").component("home", {
	templateUrl: "pages/home/home.html",
	controller: ["StoryStorageService", function (StoryStorageService) {
		var ctrl = this;

		ctrl.loader = new StoriesMetadataLoader(StoryStorageService);
		ctrl.loader.load();
	}]
});
//# sourceMappingURL=home.component.js.map
