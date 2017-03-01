"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StoriesMetadataLoader = function StoriesMetadataLoader(storyStorageService) {
	_classCallCheck(this, StoriesMetadataLoader);

	var self = this;

	// public variables
	self.isLoading = true;
	self.storiesMetadata = [];

	// public methods
	self.load = function () {
		storyStorageService.getStoriesMetadata().then(onStoriesMetadataLoaded);
	};

	// private methods
	function onStoriesMetadataLoaded(storiesMetadata) {
		self.isLoading = false;
		self.storiesMetadata = storiesMetadata;
	};
};
//# sourceMappingURL=StoriesMetadataLoader.js.map
