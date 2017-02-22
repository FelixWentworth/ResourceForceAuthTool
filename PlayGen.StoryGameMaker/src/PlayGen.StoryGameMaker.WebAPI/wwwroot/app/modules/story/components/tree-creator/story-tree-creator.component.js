angular
	.module("story")
	.component("storyTreeCreator", {		
		templateUrl: "modules/story/components/tree-creator/story-tree-creator.html",
		controller: ["StoryStorageService", function (StoryStorageService) {
			var ctrl = this;

			ctrl.isLoading = true;

			ctrl.$onInit = function() {
				// todo use promnise
				var storyId = StoryStorageService.getNewStoryId();
				ctrl.isLoading = false;



				ctrl.story = new Story(storyId);								
			};
		}]
	});