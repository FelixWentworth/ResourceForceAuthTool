class StoryPlayer {
	constructor (characters, startScene) {
		var self = this;

		// private variables
		var state = "START";
		var activeScene = startSceene;		
		var selectedChoice = {};

		// member accessors
		this.getCharacters = function() { return characters; }
		this.getActiveScene = function() { return activeScene; }
		this.getState = function () { return state; }

		// public methods
		this.applyChoice = function (choice) {
			applyCharactersEffects(choice.charactersEffects);
			selectedChoice = choice;
			state = "FEEDBACK";
		}

		this.acceptFeedback = function () {
			if(selectedChoice.scene != null) {
				activeScene = selectedChoice.scene;
				state = "CHOICE";
			} else {
				state = "END";
			}
		}

		// private methods
		function applyCharactersEffects(charactersEffects) {
			// Iterate over all the effects to be applied to the characters and either update
			// the characters' current state or append the new state to it doesn't already exist.
			for(characterEffects in charactersEffects) {
				var character = characters.find(c => c.name == characterEffects.name);

				for(effectState in characterEffects) {
					var currentState = character.state.find(s => s.$type == effectState.$type);

					if(currentState != null) {
						currentState.value = effectState.value;
					} else {
						character.states.push(effectState);
					}
				}
			}
		}
	}
}