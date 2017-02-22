angular
	.module("story")
	.factory("StoryEditorService", function() {
		var service = {};

		// public methods
		service.setStory = function (story) {
			service.story = story;
		};		

		service.createNarratorSubscene= function () {
			var subscene = new Subscene();
			subscene.elements.push(new Narrator());
			addSubsceneCharacters(subscene);
			return subscene;
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