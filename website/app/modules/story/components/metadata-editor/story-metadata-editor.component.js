angular
	.module("story")
	.component("storyMetadataEditor", {		
		templateUrl: "modules/story/components/metadata-editor/story-metadata-editor.html",
		bindings: {
			metadata: "="
		},
		controller: function() {
			var ctrl = this;

			ctrl.metadataHelp = {
				"title": "",
				"location": "",
				"language": "",				
			};

			ctrl.location = ["Any", "Belfast", "Groningen", "Preston", "Nicosia", "Valencia"];
			ctrl.language = ["English", "Spanish", "Dutch", "Greek"];
			
		}
	});