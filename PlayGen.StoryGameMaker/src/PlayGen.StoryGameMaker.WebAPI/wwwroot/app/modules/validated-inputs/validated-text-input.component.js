angular
	.module("validatedInputs")
	.component("validatedTextInput", {
		templateUrl: "modules/validated-inputs/validated-text-input.html",
		bindings: {
			label: "<",
			type: "<",
			ngModel: "=",
			placeholder: "<",
			minlength: "<",
			maxlength: "<",
	   		required: "<"
	   	}
	});