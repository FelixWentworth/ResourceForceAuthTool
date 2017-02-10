angular
	.module("storyGameMaker")
	.component("storyTreeCreator", {		
		templateUrl: "app/components/story/tree-creator/story-tree-creator.html",
		controller: ["StoryService", function (StoryService) {
			var ctrl = this;

			ctrl.isLoading = true;

			ctrl.$onInit = function() {
				// todo use promnise
				var storyId = StoryService.getNewStoryId();
				ctrl.isLoading = false;



				ctrl.story = new Story(storyId);								
			};
		}]
	});