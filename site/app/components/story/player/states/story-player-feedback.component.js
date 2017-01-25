angular
	.module("storyGameMaker")
	.component("storyPlayerFeedback", {
		templateUrl: "app/components/story/player/states/story-player-feedback.html",
		bindings: {
			story: "<"
		},
		controller: function() {
			var ctrl = this;
		}
	});