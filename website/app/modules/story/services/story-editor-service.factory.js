angular
	.module("story")
	.factory("StoryEditorService", function() {
		var service = {};

		// public methods
		service.setStory = function (story) {
			service.story = story;
		};		

		service.createChoice = function (name) {
			var choice = new Choice();
			choice.choice.choiceType = name;

			//addCharacterReactions(choice.action);			
			
			return choice;
		};

		service.createEnd = function () {
			return new End();
		};

		return service;
	});