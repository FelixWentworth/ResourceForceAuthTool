angular
	.module("story")
	.component("storyMetadata", {		
		templateUrl: "/modules/story/components/metadata/story-metadata.html",
		bindings: {
			metadata: "<", 
			showTemplate: "<"
		}, 
		controller: function () {
			var ctrl = this;
		}
	});