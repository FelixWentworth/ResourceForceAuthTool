angular
	.module("story")
	.component("storyMetadata", {		
		templateUrl: "modules/story/components/metadata/story-metadata.html",
		bindings: {
			metadata: "<"
		}, 
		controller: function () {
			var ctrl = this;
			
			ctrl.generateOutline = function () {
				// todo make data driven
				return String.format("{0}, {1}", 
					ctrl.metadata.location,
					ctrl.metadata.language);
			};
		}
	});