angular
	.module("resourceForceAuthoringTool")
	.component("createStory", {
		templateUrl: "pages/create-story/create-story.html",
		controller: ["$state", "Auth", function($state, Auth) {
			var ctrl = this;

			ctrl.isLoggedIn = Auth.isLoggedIn();
			ctrl.username = ctrl.isLoggedIn ? Auth.getName() : "";
			ctrl.$onInit = function() {
				if (!ctrl.isLoggedIn)
				{
					$state.go('home');
				}
			}
			ctrl.Logout = function() {
				ctrl.isLoggedIn = false;
				ctrl.username = "";
				Auth.logout();
				$state.go("home");
			}
		}]
	});