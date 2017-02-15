class Story {
	constructor(id) {
		var self = this;

		self.$type = "Story";
		self.id = id;
		self.metadata = new Metadata();
		self.characters = [];
		self.scene = new Scene();
	}
}