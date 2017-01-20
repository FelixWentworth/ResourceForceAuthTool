angular
	.module('storyGameMaker')
	.config(function($stateProvider){

		$stateProvider
			.state('player', 
			{
				url: "/player",
				templateUrl: "app/pages/player.html"
			})
			.state('viewer', 
			{
				url: "/viewer",
				templateUrl: "app/pages/viewer.html"
			});
	});