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
			ctrl.config.invalidMessage = "There seems to be an invalid part of your scenario." + 
						" \nYou must find it and fix it in order to save." +
						" \nThere should be a red error message to help you identify it.";

			ctrl.saveStatus = "";

			// public methods
			ctrl.save = function() {
				ctrl.saveStatus = "Saving...";
				StoryStorageService.save(ctrl.story)
				.success(function(data){
					ctrl.saveStatus = "Saved Successfully";
				})
				.error(function(data){
					ctrl.saveStatus = "Save Attempt Failed, please try again";
				})
			};
			
			ctrl.onCharacterSelectionChanged = function () {
				StoryStorageService.pruneRemovedCharacters();	
			};

			ctrl.$onInit = function() {
				StoryEditorService.setStory(ctrl.story);
			};

			// private methods
			function createCharacter(name) {
				var character = new Character(name);
				character.choices.push(new Emotion("neutral"));

				return character;
			};
		}]
	});