class Story {
	constructor(id) {
		var self = this;

		self.$type = "Story";
		self.id = id;
		self.metadata = new Metadata();
		self.characters = [];
		self.scene = new Scene();

		// Stories root scene must have at least one character and one choice
		self.characters.push(new Character());
		self.scene.choices.push(new Choice());
	}
}