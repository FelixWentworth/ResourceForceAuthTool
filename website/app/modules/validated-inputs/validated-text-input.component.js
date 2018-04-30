angular
	.module("validatedInputs")
	.component("validatedTextInput", {
		templateUrl: "/modules/validated-inputs/validated-text-input.html",
		bindings: {
			label: "<",
			type: "<",
			ngModel: "=",
			placeholder: "<",
			minlength: "<",
			maxlength: "<",
	   		required: "<"
	   	}, 
	   	controller: function () {
	   		var ctrl = this;

	   		// public methods
	   		ctrl.$postLink = function () {
	   			// trigger validation
	   			ctrl.form.$setSubmitted();	   			
	   			// todo find a way to get the relevant messages to show in the html too	  
	   		};
	   	}
	});