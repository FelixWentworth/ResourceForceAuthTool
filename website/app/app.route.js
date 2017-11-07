angular
	.module("resourceForceAuthoringTool")
	.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state("home", {
				url: "/home",
				component: "home"
			})
			.state("play-story", {
				url: "/play-story/{storyId}",				
				resolve: {
					storyId: ["$stateParams", s => s.storyId ]
				},
				component: "playStory"
			})
			.state("view-story", {
				url: "/view-story/{storyId}",
				resolve: {
					storyId: ["$stateParams", s => s.storyId ]
				},
				component: "viewStory"				
			})
			.state("edit-story", {
				url: "/edit-story/{storyId}",				
				resolve: {
					storyId: ["$stateParams", s => s.storyId ]
				},
				component: "editStory"
			})
			.state("create-story", {
				url: "/create-story",
				component: "createStory"
			})
			.state("manage-member", {
				url: "/manage-member",
				component: "manageMember"
			})
			.state("review-story", {
				url: "/review-story",
				component: "reviewStory"
			})
			.state("approved-story", {
				url: "/approved-story",
				component: "approvedStory"
			});			

			$urlRouterProvider.otherwise("/home");
	}]);