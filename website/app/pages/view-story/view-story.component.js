angular
	.module("resourceForceAuthoringTool")
	.component("viewStory", {
		templateUrl: "pages/view-story/view-story.html",
		bindings: {
			storyId: "<"
		},
		controller: ["StoryStorageService", "$state", "Auth", function(StoryStorageService, $state, Auth) {
			var ctrl = this;

			ctrl.loader = new StoryFromIdLoader(StoryStorageService);
			ctrl.isLoggedIn = Auth.isLoggedIn();
			ctrl.$onInit = function() {
				if (!ctrl.isLoggedIn)
				{
					$state.go('home');
				}
				ctrl.loader.load(ctrl.storyId);
			}
		}]
	});