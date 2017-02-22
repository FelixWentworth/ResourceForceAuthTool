class Story {
	constructor(id) {
		var self = this;

		self._type = "Story";
		self.metadata = new Metadata(id);
		self.content = new Content();
	}
}