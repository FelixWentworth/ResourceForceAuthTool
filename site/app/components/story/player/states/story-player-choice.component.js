angular
	.module('storyGameMaker')
	.component('storyPlayerChoice', {
		templateUrl: "app/components/story/player/states/story-player-choice.html",
		bindings: {
			story: "<"
		},
		controller: function() {
			var ctrl = this;
		}
	});