angular
	.module('storyGameMaker')
	.component('storyPlayer', {
		templateUrl: "app/components/story/player/story-player.html",
		bindings: {
			story: "<"
		},
		controller: function(StoryService) {
			var ctrl = this;
		}
	});