angular
	.module("resourceForceAuthoringTool")
	.component("createStory", {
		templateUrl: "pages/create-story/create-story.html",
		controller: ["$state", "Auth", function($state, Auth) {
			var ctrl = this;

			ctrl.title = "Create a Scenario";

			ctrl.isLoggedIn = Auth.isLoggedIn();
			ctrl.username = ctrl.isLoggedIn ? Auth.getName() : "";
			ctrl.$onInit = function() {
				if (!ctrl.isLoggedIn)
				{
					$state.go('home');
				}
			}
		}]
	});