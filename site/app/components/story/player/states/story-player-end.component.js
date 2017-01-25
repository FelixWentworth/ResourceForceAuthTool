angular
	.module("storyGameMaker")
	.component("storyPlayerEnd", {
		templateUrl: "app/components/story/player/states/story-player-end.html",
		bindings: {
			story: "<"
		},
		controller: function() {
			var ctrl = this;
		}
	});