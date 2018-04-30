angular
.module("customFooter")
.component("customFooter", {
    templateUrl: "/modules/custom-components/custom-footer.html",
    bindings: {
        isLoggedIn: "<",
        showGuide: "<",
        showHome: "<",
        username: "<"
    },
    controller: ["$state", "Auth", function ($state, Auth) {
        var ctrl = this;

        ctrl.Logout = function() {
            ctrl.isLoggedIn = false;
            ctrl.username = "";
            Auth.logout();
            $state.reload();
        }
    }]
});