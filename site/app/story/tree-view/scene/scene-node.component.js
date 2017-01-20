angular
	.module('storyGameMaker')
	.component("sceneNode", {		
		templateUrl: "app/story/tree-view/scene/scene-node.html",
		bindings: {
			scene: "="
		}
	});