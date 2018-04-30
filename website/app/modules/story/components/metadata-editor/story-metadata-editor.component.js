angular
	.module("story")
	.component("storyMetadataEditor", {		
		templateUrl: "/modules/story/components/metadata-editor/story-metadata-editor.html",
		bindings: {
			metadata: "="
		},
		controller: [ "config", function(config) {
			var ctrl = this;

			ctrl.metadataHelp = {
				"title": "",
				"location": "",
				"language": "",				
			};

			ctrl.location = config.content.locations;
			ctrl.language = config.content.languages;
			
			ctrl.titleMin = config.constraints.title.min;
			ctrl.titleMax = config.constraints.title.max;
		}]
	});