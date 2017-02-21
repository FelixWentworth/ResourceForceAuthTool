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
			ctrl.outline = {
				preCategory: "A story about",
				postCategory: "and",
				postSkill: "at the",
				postLocation: "."
			};

			ctrl.metadataHelp = {
				"title": "give your story a title",
				"author": "what's your name",
			};

			ctrl.metadataOptions = {
				"category": ["Skills for leadership", "Skills for friendship", "Skills for conflict resolution"],
				"skill": ["Destroying your enemies", "Making new friends", "Introducing others"],
				"location": ["Playground", "Classroom", "Office"],
			};
		}
	});