angular
	.module('storyGameMaker')
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('browse-stories', 
			{
				url: "/browse-stories",
				templateUrl: "app/pages/browse-stories.html"
			})
			.state('play-story', 
			{
				url: "/play-story",
				templateUrl: "app/pages/play-story.html"
			})
			.state('view-story', 
			{
				url: "/view-story",
				templateUrl: "app/pages/view-story.html"
			});			

			$urlRouterProvider.otherwise("/browse-stories");
	});