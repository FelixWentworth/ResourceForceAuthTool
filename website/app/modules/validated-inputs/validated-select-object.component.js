angular
.module("validatedInputs")
.component("validatedSelectObject", {
    templateUrl: "/modules/validated-inputs/validated-select-object.html",
    bindings: {
        label: "<",
        ngModel: "=",
        options: "=",
        placeholder: "<",
           required: "<"
       },
});