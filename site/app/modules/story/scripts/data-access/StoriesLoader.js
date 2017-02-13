class StoriesLoader {
	constructor(storyService) {
		var self = this;

		// public variables
		this.isLoading = true;
		this.stories = {};

		// private variables
		storyService = storyService;
		
		// public methods
		this.load = function() {
			storyService.getStories().then(onStoriesLoaded);
		};

		// private methods
		function onStoriesLoaded(stories) {
			self.isLoading = false;
			self.stories = stories;
		};
	}
}