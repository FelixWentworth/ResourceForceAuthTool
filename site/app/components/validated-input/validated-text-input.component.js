angular
	.module("storyGameMaker")
	.component("validatedTextInput", {		
		templateUrl: "app/components/validated-input/validated-text-input.html",
		bindings: {
			ngModel: "=",
			ngMinlength: "<",
			ngRequired: "<",
			placeholder: "<",
		}
	});