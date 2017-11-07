angular
	.module("resourceForceAuthoringTool")
	.component("editStory", {
		templateUrl: "pages/edit-story/edit-story.html",
		bindings: {
			storyId: "<"
		},
		controller: ["StoryStorageService", "$state", "Auth", function(StoryStorageService, $state, Auth) {
			var ctrl = this;
			ctrl.title = "Edit a Scenario";
			ctrl.loader = new StoryFromIdLoader(StoryStorageService);
			ctrl.isLoggedIn = Auth.isLoggedIn();
			ctrl.username = ctrl.isLoggedIn ? Auth.getName() : "";
			ctrl.$onInit = function() {
				if (!ctrl.isLoggedIn)
				{
					$state.go('home');
				}
				ctrl.loader.load(ctrl.storyId);
			}
		}]
	});