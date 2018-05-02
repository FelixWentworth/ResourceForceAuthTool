angular
    .module("resourceForceAuthoringTool")
    .component("activeStateSplit", {
        templateUrl: "/components/active-state-split/active-state-split.html",
        transclude: {
            activeTitle: "activeTitle",
            activeContent: "activeContent",
            inactiveTitle: "inactiveTitle",
            inactiveContent: "inactiveContent",
        }
    });