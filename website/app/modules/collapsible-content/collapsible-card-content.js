angular
.module("collapsibleContent")
.component("collapsibleCardContent", {
    templateUrl: "/modules/collapsible-content/collapsible-card-content.html",
    transclude: true,
    controller: function () {
        var ctrl = this;
        ctrl.isSelected = false;

        ctrl.select = function () {
            ctrl.isSelected = !ctrl.isSelected;
        };
    }
});