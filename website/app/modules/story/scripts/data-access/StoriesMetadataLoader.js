class StoriesMetadataLoader {
	constructor(storyStorageService) {
		var self = this;

		// public variables
		self.isLoading = true;
		self.storiesMetadata = [];
		self.validationStoriesMetadata = [];

		// public methods
		self.load = function(creatorId) {
			storyStorageService.getStoriesMetadata(creatorId)
				.then(onStoriesMetadataLoaded);
		};

		self.loadForValidation = function(creatorId) {
			storyStorageService.GetStoriesForValidation(creatorId)
				.then(onStoriesForValidationLoaded);
		}
		
		self.loadExisting = function(language, region, callback){
			storyStorageService.loadExisting(language, region)
				.then(storiesMetadata => {
					onStoriesMetadataLoaded(storiesMetadata);
					if (callback) {
						callback(storiesMetadata);
					}
				});
		}

		// private methods
		function onStoriesMetadataLoaded(storiesMetadata) {
			self.isLoading = false;
			self.storiesMetadata = storiesMetadata;
		};

		function onStoriesForValidationLoaded(metadata) {
			self.isLoading = false;
			self.validationStoriesMetadata = metadata;
		}
	}
}