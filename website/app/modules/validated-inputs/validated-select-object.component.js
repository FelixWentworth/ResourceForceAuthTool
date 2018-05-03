angular
.module("validatedInputs")
.component("validatedSelectObject", {
    templateUrl: "/modules/validated-inputs/validated-select-object.html",
    bindings: {
        label: "<",
        ngModel: "=",
        ngChange: "=",
        options: "=",
        placeholder: "<",
           required: "<"
       },
});