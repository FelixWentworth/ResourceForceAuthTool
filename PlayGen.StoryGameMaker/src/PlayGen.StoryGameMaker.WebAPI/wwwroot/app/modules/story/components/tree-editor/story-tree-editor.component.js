angular
	.module("story")
	.component("storyTreeEditor", {		
		templateUrl: "modules/story/components/tree-editor/story-tree-editor.html",
		bindings: {
			story: "<"
		},
		controller: ["StoryService", function (StoryService) {
			var ctrl = this;

			// todo make data driven
			ctrl.config = {};
			ctrl.config.characters = {};
			ctrl.config.characters.minimum = 2;
			ctrl.config.characters.all = [
				new Character("Bob"), 
				new Character("Sue"),
				new Character("Mo"),
				new Character("Hannah"),
				new Character("Frank"),
			];

			ctrl.apply = function(isValid) {
				if(isValid) {
					StoryService.save(ctrl.story);
				} else {
					alert("There seems to be an invalid part of your story." + 
						" \nYou must find it and fix it in order to save." +
						" \nIt should be hilighted to help you identify it.");
				}
			};
		}]
	});