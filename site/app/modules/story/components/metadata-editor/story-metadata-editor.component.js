angular
	.module("story")
	.component("storyMetadataEditor", {		
		templateUrl: "modules/story/components/metadata-editor/story-metadata-editor.html",
		bindings: {
			metadata: "="
		},
		controller: function() {
			var ctrl = this;

			// todo make data driven

			ctrl.metadataHelp = {
				"title": "placeholder metadata help.",
				"outline": "placeholder outline help.",
				"author": "placeholder author help",
			};

			ctrl.metadataOptions = {
				"category": ["placeholder 1", "placeholder 2", "placeholder 3"],
				"skill": ["placeholder 1", "placeholder 2", "placeholder 3"],
				"location": ["placeholder 1", "placeholder 2", "placeholder 3"],
			};
		}
	});