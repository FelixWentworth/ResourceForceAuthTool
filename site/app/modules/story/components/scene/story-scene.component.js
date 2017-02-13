angular
	.module("story")
	.component("storyScene", {		
		templateUrl: "app/modules/story/components/scene/story-scene.html",
		bindings: {
			scene: "<"
		}
	});