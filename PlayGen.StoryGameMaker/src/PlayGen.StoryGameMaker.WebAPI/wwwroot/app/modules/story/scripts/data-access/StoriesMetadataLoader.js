class StoriesMetadataLoader {
	constructor(storyService) {
		var self = this;

		// public variables
		self.isLoading = true;
		self.storiesMetadata = [];

		// public methods
		self.load = function() {
			storyService.getStoriesMetadata()
				.then(onStoriesMetadataLoaded);
		};

		// private methods
		function onStoriesMetadataLoaded(storiesMetadata) {
			self.isLoading = false;
			self.storiesMetadata = storiesMetadata;
		};
	}
}