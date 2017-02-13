angular
	.module("story")
	.component("storyPlayerStart", {
		templateUrl: "app/modules/story/components/player/states/story-player-start.html",
		bindings: {
			story: "<",
			start: "="
		}
	});