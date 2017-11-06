angular
	.module("resourceForceAuthoringTool")
	.component("playStory", {
		templateUrl: "pages/play-story/play-story.html",
		bindings: {
			storyId: "<"
		},
		controller: ["StoryStorageService", "$state", "Auth", function(StoryStorageService, $state, Auth) {
			var ctrl = this;
			
			ctrl.title = "Play Scenario";

			ctrl.loader = new StoryFromIdLoader(StoryStorageService);
			ctrl.isPlayerComplete = false;
			ctrl.isLoggedIn = Auth.isLoggedIn();
			ctrl.username = ctrl.isLoggedIn ? Auth.getName() : "";
			ctrl.$onInit = function() {
				if (!ctrl.isLoggedIn)
				{
					$state.go('home');
				}
				ctrl.loader.load(ctrl.storyId);
			}
			ctrl.Logout = function() {
				ctrl.isLoggedIn = false;
				ctrl.username = "";
				Auth.logout();
				$state.go("home");
			}
		}]
	});