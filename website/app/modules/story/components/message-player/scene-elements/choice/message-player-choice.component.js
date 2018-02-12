angular
	.module("story")
	.component("messagePlayerChoice", {		
		templateUrl: "/modules/story/components/message-player/scene-elements/choice/message-player-choice.html",
		bindings: {
			choice: "<",
			apply: "="
		}
	});