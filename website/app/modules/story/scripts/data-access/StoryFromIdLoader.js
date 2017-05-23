class StoryFromIdLoader {
	constructor(storyStorageService) {
		var self = this;

		// public variables
		this.isLoading = true;
		this.story = {};
		
		// public methods
		this.load = function(storyId) {
			storyStorageService.getById(storyId).then(onStoryLoaded);
		};

		// private methods
		function onStoryLoaded(story) {
			self.isLoading = false;
			self.story = story;
		};
	}
}