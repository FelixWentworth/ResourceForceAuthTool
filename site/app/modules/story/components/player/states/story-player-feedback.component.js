angular
	.module("story")
	.component("storyPlayerFeedback", {
		templateUrl: "app/modules/story/components/player/states/story-player-feedback.html",
		bindings: {
			feedback: "<",
			acceptFeedback: "="
		}
	});