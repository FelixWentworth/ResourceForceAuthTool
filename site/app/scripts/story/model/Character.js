class Character {
	constructor() {
		var self = this;

		self.$type = "Character";
		self.name = "";
		self.states = [];

		// Characters must have at least 1 state
		self.states.push(new State());
	}
}