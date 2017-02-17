class Story {
	constructor(id) {
		var self = this;

		self._type = "Story";
		self.metadata = new Metadata();
		self.content = new Content();
	}
}