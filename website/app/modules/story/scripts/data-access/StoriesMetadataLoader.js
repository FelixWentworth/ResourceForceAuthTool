class StoriesMetadataLoader {
	constructor(storyStorageService) {
		var self = this;

		// public variables
		self.isLoading = true;
		self.storiesMetadata = [];

		// public methods
		self.load = function() {
			storyStorageService.getStoriesMetadata()
				.then(onStoriesMetadataLoaded);
		};

		// private methods
		function onStoriesMetadataLoaded(storiesMetadata) {
			self.isLoading = false;
			self.storiesMetadata = storiesMetadata;
		};
	}
}