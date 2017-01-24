angular
	.module('storyGameMaker')
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('browse-stories', {
				url: "/browse-stories",
				component: 'browseStories'
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