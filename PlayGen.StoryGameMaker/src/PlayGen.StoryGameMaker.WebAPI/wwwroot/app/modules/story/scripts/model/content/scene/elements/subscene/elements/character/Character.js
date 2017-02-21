class Character {
	constructor(name) {
		var self = this;

		self._type = "Character";
		self.name = name;
		self.elements = [
			new Emotion("neutral")
		];		
	}
}