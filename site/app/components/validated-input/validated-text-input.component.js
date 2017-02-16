angular
	.module("storyGameMaker")
	.component("validatedTextInput", {		
		templateUrl: "components/validated-input/validated-text-input.html",
		bindings: {
			ngModel: "=",
			ngMinlength: "<",
			ngRequired: "<",
			placeholder: "<",
		}
	});