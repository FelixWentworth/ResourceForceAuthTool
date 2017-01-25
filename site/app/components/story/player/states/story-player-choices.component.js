angular
	.module("storyGameMaker")
	.component("storyPlayerChoices", {
		templateUrl: "app/components/story/player/states/story-player-choices.html",
		bindings: {
			choices: "<",
			weeewooo: "="
		}	
	});