angular
	.module("story")
	.component("storyMetadataEditor", {		
		templateUrl: "app/modules/story/components/metadata-editor/story-metadata-editor.html",
		bindings: {
			metadata: "="
		}
	});