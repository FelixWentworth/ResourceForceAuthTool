class StoryFromIdLoader {
	constructor(storyService) {
		var self = this;

		// public variables
		this.isLoading = true;
		this.story = {};

		// private variables
		storyService = storyService;
		
		// public methods
		this.load = function(storyId) {
			storyService.getById(storyId).then(onStoryLoaded);
		};

		// private methods
		function onStoryLoaded(story) {
			self.isLoading = false;
			self.story = story;
		};
	}
}