"use strict";

angular.module("storyGameMaker").config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state("home", {
		url: "/home",
		component: "home"
	}).state("play-story", {
		url: "/play-story/{storyId}",
		resolve: {
			storyId: ["$stateParams", function (s) {
				return s.storyId;
			}]
		},
		component: "playStory"
	}).state("view-story", {
		url: "/view-story/{storyId}",
		resolve: {
			storyId: ["$stateParams", function (s) {
				return s.storyId;
			}]
		},
		component: "viewStory"
	}).state("edit-story", {
		url: "/edit-story/{storyId}",
		resolve: {
			storyId: ["$stateParams", function (s) {
				return s.storyId;
			}]
		},
		component: "editStory"
	}).state("create-story", {
		url: "/create-story",
		component: "createStory"
	});

	$urlRouterProvider.otherwise("/home");
}]);
//# sourceMappingURL=app.route.js.map
