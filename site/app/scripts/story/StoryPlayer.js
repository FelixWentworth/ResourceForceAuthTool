class StoryPlayer {
	constructor (characters, startScene) {
		var self = this;

		// private variables
		self.state = "AWAITING_START";
		self.activeScene = startScene;		
		self.selectedChoice = {};
		self.characters = characters;

		// public methods
		self.start = function() {
			self.state = "AWAITING_CHOICE";
		}

		self.applyChoice = function (choice) {
			applyCharactersEffects(choice.charactersEffects);
			self.selectedChoice = choice;
			self.state = "FEEDBACK";
		}

		self.acceptFeedback = function () {
			if(selectedChoice.scene != null) {
				self.activeScene = selectedChoice.scene;
				self.state = "AWAITING_CHOICE";
			} else {
				self.state = "ENDED";
			}
		}

		// private methods
		function applyCharactersEffects(charactersEffects) {
			// Iterate over all the effects to be applied to the characters and either update
			// the characters' current state or append the new state to it doesn't already exist.
			for(characterEffects in charactersEffects) {
				var character = self.characters.find(c => c.name == characterEffects.name);

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