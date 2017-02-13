class StoryPlayer {
	constructor (characters, startScene) {
		var self = this;

		// public variables
		self.state = "AWAITING_START";
		self.activeScene = startScene;		
		self.selectedChoice = {};
		self.characters = characters;

		// public methods
		self.start = function() {
			self.state = "AWAITING_CHOICE";
		};

		self.applyChoice = function(choice) {
			self.characters = choice.characters;
			self.selectedChoice = choice;
			self.state = "FEEDBACK";
		};

		self.acceptFeedback = function() {
			if(self.selectedChoice.scene != null) {
				self.activeScene = self.selectedChoice.scene;
				self.state = "AWAITING_CHOICE";
			} else {
				self.state = "ENDED";
			}
		};
	}
}