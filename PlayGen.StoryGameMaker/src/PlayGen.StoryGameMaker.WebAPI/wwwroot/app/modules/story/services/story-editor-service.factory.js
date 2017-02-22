angular
	.module("story")
	.factory("StoryEditorService", function() {
		var service = {};

		// public methods
		service.setStory = function (story) {
			service.story = story;
		};		

		service.createNarratorSubscene = function () {
			var subscene = new Subscene();
			subscene.elements.push(new Narrator());
			addSubsceneCharacters(subscene);
			return subscene;
		};

		service.createChoice = function (name) {
			var choice = new Choice();
			choice.scene.name = name;
			choice.action = new Subscene();
			addSubsceneCharacters(choice.action);			
			return choice;
		};

		service.createEnd = function () {
			return new End();
		};

		// private methods
		function addSubsceneCharacters(subscene) {
			service.story.content.characters.forEach(c => {
				var character = new Character(c.name);
				character.elements.push(new Emotion("none"));
				subscene.elements.push(character);
			});
		}

		return service;
	});