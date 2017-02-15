angular
	.module("story")
	.component("messagePlayerSceneElements", {
		templateUrl: "app/modules/story/components/message-player/scene-elements/message-player-scene-elements.html",
		bindings: {
			elements: "<",
			applyChoice: "="
		}
	});