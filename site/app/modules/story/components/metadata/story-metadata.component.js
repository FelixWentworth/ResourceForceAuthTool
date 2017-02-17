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
				return String.format("A story about {0} and {1} at {2}", 
					ctrl.metadata.category,
					ctrl.metadata.skill,
					ctrl.metadata.location);
			};
		}
	});