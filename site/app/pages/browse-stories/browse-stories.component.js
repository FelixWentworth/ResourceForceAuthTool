angular
	.module("storyGameMaker")
	.component("browseStories", {
		templateUrl: "app/pages/browse-stories/browse-stories.html",
		controller: ["StoryService", function(StoryService) {
			var ctrl = this;

			ctrl.loader = new StoriesLoader(StoryService);
			ctrl.loader.load();
		}]
	});


		