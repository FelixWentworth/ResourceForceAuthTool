angular
	.module('storyGameMaker')
	.component('storyPlayerStart', {
		templateUrl: "app/components/story/player/states/story-player-start.html",
		bindings: {
			story: "<"
		},
		controller: function() {
			var ctrl = this;
		}
	});