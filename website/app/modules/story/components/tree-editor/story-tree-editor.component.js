angular
	.module("story")
	.component("storyTreeEditor", {		
		templateUrl: "modules/story/components/tree-editor/story-tree-editor.html",
		bindings: {
			story: "<"
		},
		controller: ["StoryEditorService", "StoryStorageService", "$state", "Auth", function (StoryEditorService, StoryStorageService, $state, Auth) {
			var ctrl = this;
			ctrl.memberType = Auth.getType();
			// public fields
			// todo make data driven
			ctrl.config = {};
			ctrl.config.invalidMessage = "There seems to be an invalid part of your scenario." + 
						" \nYou must find it and fix it in order to save." +
						" \nMake sure each field is filled in for each section. You must have at least 2 decisions available for each incident that is not an end";

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

			ctrl.submit = function(){
				ctrl.saveStatus = "Saving...";				
				StoryStorageService.save(ctrl.story)
				.success(function(){
					ctrl.saveStatus = "Submitting...";							
					StoryStorageService.submitStory(ctrl.story)
					.success(function(){
						ctrl.saveStatus = "Submitted Successfully";							
						StoryStorageService.submitStory(ctrl.story);
					})
					.catch(function(){
						ctrl.saveStatus = "Submit Attempt Failed, please try again";
					});
				})
				.catch(function(){
					ctrl.saveStatus = "Save Attempt Failed, please try again";
				});
			}
			
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