angular
	.module("story")
	.component("messagePlayerChoice", {		
		templateUrl: "modules/story/components/message-player/choice/message-player-choice.html",
		bindings: {
			choice: "<",
			apply: "="
		}
	});