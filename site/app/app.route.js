angular
	.module('storyGameMaker')
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('browse-stories', {
				url: "/browse-stories",
				templateUrl: "app/pages/browse-stories/browse-stories.html"
			})
			.state('play-story', {
				url: "/play-story/{storyId}",				
				resolve: {
					storyId: ['$stateParams', s => s.storyId ]
				},
				component: 'playStory'
			})
			.state('view-story', {
				url: "/view-story/{storyId}",
				resolve: {
					storyId: ['$stateParams', s => s.storyId ]
				},
				component: 'viewStory'				
			})
			.state('edit-story', {
				url: "/edit-story/{storyId}",				
				resolve: {
					storyId: ['$stateParams', s => s.storyId ]
				},
				component: 'editStory'
			});			

			$urlRouterProvider.otherwise("/browse-stories");
	}]);