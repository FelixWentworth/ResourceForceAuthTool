angular
	.module("story")
	.factory("StoryEditorService", function() {
		var service = {};

		// public methods
		service.setStory = function (story) {
			service.story = story;
		};		

		service.getCharacters = function() {
			return service.story.content.characters;
		};

		service.createNarratorSubscene = function () {
			var subscene = new Subscene();
			subscene.elements.push(new Narrator());
			addSubsceneCharacters(subscene);
			return subscene;
		};

		service.createCharacterSubscene = function (character) {
			var subscene = new Subscene();

			var speechCharacter = new Character(character.name);
			subscene.elements.push(speechCharacter);
			addSubsceneCharacters(subscene);

			speechCharacter.elements.push(new Speech());

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
			service.getCharacters().forEach(c => {

				var emotion = null;
				var character = Array.singleOrNull(subscene.elements, element => element._type == "Character" && element.name == c.name);
				if(character != null) {
					emotion = Array.singleOrNull(character.elements, element => element._type == "Emotion");
				} else {
					var character = new Character(c.name);					
					subscene.elements.push(character);
				}

				if(emotion == null) {
					emotion = new Emotion();
					character.elements.push(emotion)
				}			

				emotion.value = "none";
			});
		}

		return service;
	});