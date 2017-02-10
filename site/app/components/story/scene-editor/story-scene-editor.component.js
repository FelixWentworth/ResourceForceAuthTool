angular
	.module("storyGameMaker")
	.component("storySceneEditor", {		
		templateUrl: "app/components/story/scene-editor/story-scene-editor.html",
		bindings: {
			scene: "="
		}
	});