class Story {
	constructor(id) {
		var self = this;

		self.type = "Story";
		self.metadata = new Metadata();
		self.content = new Content();
	}
}