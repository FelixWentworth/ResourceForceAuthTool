"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StoryFromIdLoader = function StoryFromIdLoader(storyStorageService) {
	_classCallCheck(this, StoryFromIdLoader);

	var self = this;

	// public variables
	this.isLoading = true;
	this.story = {};

	// public methods
	this.load = function (storyId) {
		storyStorageService.getById(storyId).then(onStoryLoaded);
	};

	// private methods
	function onStoryLoaded(story) {
		self.isLoading = false;
		self.story = story;
	};
};
//# sourceMappingURL=StoryFromIdLoader.js.map
