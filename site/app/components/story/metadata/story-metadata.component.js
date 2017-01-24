angular
	.module('storyGameMaker')
	.component("storyMetadata", {		
		templateUrl: "app/components/story/metadata/story-metadata.html",
		bindings: {
			metadata: "<"
		}
	});