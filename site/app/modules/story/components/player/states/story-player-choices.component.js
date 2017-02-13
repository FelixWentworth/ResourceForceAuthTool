angular
	.module("story")
	.component("storyPlayerChoices", {
		templateUrl: "app/modules/story/components/player/states/story-player-choices.html",
		bindings: {
			choices: "<",
			setChoice: "="
		}	
	});