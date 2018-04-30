angular
	.module("story")
	.component("storyMetadata", {		
		templateUrl: "/modules/story/components/metadata/story-metadata.html",
		bindings: {
			metadata: "<"
		}, 
		controller: function () {
			var ctrl = this;
		}
	});