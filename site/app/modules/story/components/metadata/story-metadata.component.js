angular
	.module("story")
	.component("storyMetadata", {		
		templateUrl: "app/modules/story/components/metadata/story-metadata.html",
		bindings: {
			metadata: "<"
		}
	});