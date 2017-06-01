angular
	.module("story")
	.factory("StoryEditorService", function() {
		var service = {};

		// public methods
		service.setStory = function (story) {
			service.story = story;
		};		

		service.pruneRemovedCharacters = function () {
			// prune characters
/*
			var checkScenes = service.story.content.scene;

			while(checkScenes.length > 0) {
				var checkScene = checkScenes.splice(0, 1);

				checkScene.choices.forEach(element => {

					if(element._type == "Subscene") {
						if() {

						}

					} else if(element._type == "Choice") {
						checkElements = checkElements.concat(element.action);
					}

				});
			};*/
		};

		service.getCharacters = function() {
			return service.story.content.characters;
		};

		// service.createNarratorSubscene = function () {
		// 	var subscene = new Subscene();
		// 	subscene.action = new Narrator();
			
		// 	addCharacterReactions(subscene);

		// 	return subscene;
		// };

		// service.createCharacterSubscene = function (character) {
		// 	var subscene = new Subscene();

		// 	var speechCharacter = new Character(character.name);
		// 	subscene.action = speechCharacter;

		// 	addCharacterReactions(subscene);

		// 	speechCharacter.choices.push(new Speech());

		// 	return subscene;			
		// };

		service.createChoice = function (name) {
			var choice = new Choice();
			choice.choice.choiceType = name;

			//addCharacterReactions(choice.action);			
			
			return choice;
		};

		service.createEnd = function () {
			return new End();
		};

		// private methods
		// function addCharacterReactions(subscene) {
		// 	service.getCharacters().forEach(c => {

		// 		var emotion = null;
		// 		var character = null;

		// 		if(subscene.action._type == "Character" && subscene.action.name == c.name) {
		// 			character = subscene.action;
		// 		} else {
		// 			character = Array.singleOrNull(subscene.reactions, reaction => reaction._type == "Character" && reaction.name == c.name);
		// 		}

		// 		if(character != null) {
		// 			emotion = Array.singleOrNull(character.choices, element => element._type == "Emotion");
		// 		} else {
		// 			var character = new Character(c.name);					
		// 			subscene.reactions.push(character);
		// 		}

		// 		if(emotion == null) {
		// 			emotion = new Emotion();
		// 			character.choices.push(emotion)
		// 		}			

		// 		emotion.value = "none";
		// 	});
		// }

		return service;
	});