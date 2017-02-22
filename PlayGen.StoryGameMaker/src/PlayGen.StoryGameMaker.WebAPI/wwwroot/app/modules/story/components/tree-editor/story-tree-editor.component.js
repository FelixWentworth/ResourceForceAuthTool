angular
	.module("story")
	.component("storyTreeEditor", {		
		templateUrl: "modules/story/components/tree-editor/story-tree-editor.html",
		bindings: {
			story: "<"
		},
		controller: ["StoryEditorService", "StoryStorageService", function (StoryEditorService, StoryStorageService) {
			var ctrl = this;

			// public fields
			// todo make data driven
			ctrl.config = {};
			ctrl.config.characters = {};
			ctrl.config.characters.minimum = 2;
			ctrl.config.characters.all = [
				createCharacter("Bob"), 
				createCharacter("Sue"),
				createCharacter("Mo"),
				createCharacter("Hannah"),
				createCharacter("Frank"),
			];

			// public methods
			ctrl.apply = function(isValid) {
				if(isValid) {
					StoryStorageService.save(ctrl.story);
				} else {
					alert("There seems to be an invalid part of your story." + 
						" \nYou must find it and fix it in order to save." +
						" \nIt should be hilighted to help you identify it.");
				}
			};

			ctrl.$onInit = function() {
				StoryEditorService.setStory(ctrl.story);
			};

			// private methods
			function createCharacter(name) {
				var character = new Character(name);
				character.elements.push(new Emotion("neutral"));

				return character;
			};
		}]
	});