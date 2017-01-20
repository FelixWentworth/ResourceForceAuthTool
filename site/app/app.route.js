angular
	.module('storyGameMaker')
	.config(function($stateProvider){

		$stateProvider
			.state('player', 
			{
				url: "/player",
				templateUrl: "app/story/player/story.view.html"
			})
			.state('viewer', 
			{
				url: "/viewer",
				templateUrl: "app/story/viewer/story.view.html"
			});
	});