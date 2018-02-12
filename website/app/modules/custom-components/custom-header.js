angular
.module("customHeader")
.component("customHeader", {
    templateUrl: "/modules/custom-components/custom-header.html",
    bindings: {
        title: "<"
    },
    controller: function () {
        var ctrl = this;
    }
});