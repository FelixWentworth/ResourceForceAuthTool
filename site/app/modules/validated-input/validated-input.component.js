angular
	.module("validatedInput", ["ngMaterial", "ngMessages"])
	.component("validatedInput", {
		templateUrl: "modules/validated-input/validated-input.html",
		bindings: {
			label: "<",
			ngModel: "=",
			placeholder: "<",
			minlength: "<",
			maxlength: "<",
	   		required: "<"
	   	}
	});