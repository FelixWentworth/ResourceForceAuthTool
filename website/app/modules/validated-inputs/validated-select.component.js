angular
	.module("validatedInputs")
	.component("validatedSelect", {
		templateUrl: "modules/validated-inputs/validated-select.html",
		bindings: {
			label: "<",
			ngModel: "=",
			options: "=",
			placeholder: "<",
	   		required: "<"
	   	}
	});