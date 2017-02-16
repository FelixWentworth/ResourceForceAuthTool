angular
	.module("storyGameMaker")
	.component("home", {
		templateUrl: "pages/home/home.html",
		controller: ["StoryService", function(StoryService) {
			var ctrl = this;

			ctrl.loader = new StoriesLoader(StoryService);
			ctrl.loader.load();
		}]
	});