class StoriesMetadataLoader {
	constructor(storyStorageService) {
		var self = this;

		// public variables
		self.isLoading = true;
		self.storiesMetadata = [];

		// public methods
		self.load = function(creatorId) {
			storyStorageService.getStoriesMetadata(creatorId)
				.then(onStoriesMetadataLoaded);
		};

		// private methods
		function onStoriesMetadataLoaded(storiesMetadata) {
			self.isLoading = false;
			self.storiesMetadata = storiesMetadata;
		};
	}
}