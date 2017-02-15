angular
	.module("story")
	.component("messagePlayerChoice", {		
		templateUrl: "app/modules/story/components/message-player/choice/message-player-choice.html",
		bindings: {
			choice: "<",
			apply: "="
		}
	});