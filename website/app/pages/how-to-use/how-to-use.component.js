angular
.module("resourceForceAuthoringTool")
.component("howToUse", {
    templateUrl: "/pages/how-to-use/how-to-use.html",
    controller: ["StoryStorageService", "$http", "$state", "Auth", function(StoryStorageService, $http, $state, Auth) {
        var ctrl = this;
        ctrl.title = "Using The Authoring Tool"

        ctrl.isLoggedIn = Auth.isLoggedIn();
        ctrl.username = ctrl.isLoggedIn ? Auth.getName() : "";

        ctrl.$onInit = function() {

        }
    }]
});