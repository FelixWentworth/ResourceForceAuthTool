angular
	.module("storyGameMaker")
	.component("storyScene", {		
		templateUrl: "app/components/story/scene/story-scene.html",
		bindings: {
			scene: "<"
		}
	});