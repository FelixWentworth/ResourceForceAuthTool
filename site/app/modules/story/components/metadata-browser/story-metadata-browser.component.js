angular
	.module("story")
	.component("storyMetadataBrowser", {
		templateUrl: "modules/story/components/metadata-browser/story-metadata-browser.html",
		bindings: {
			storiesMetadata: "<"
		}
	});