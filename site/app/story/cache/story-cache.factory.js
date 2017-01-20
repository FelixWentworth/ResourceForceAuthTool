angular
	.module('storyGameMaker')
	.factory('StoryCache', function($http) {
		// instance
		var service = {};

		// private variables
		var stories = {};
		var storyPreviewList = [];
		var isLoading = false;

		// public methods
		service.reload = function() {
			isLoading = true;
			$http.get("app/story/demo/story-demo.json")
				.then(function(story){
					stories[story.data.id] = story.data;
					generatePreviews(stories);
					isLoading = false;
				});
		};

		service.getById = function(id) {
			return stories[id];
		};

		service.getIsLoading = function() {
			return isLoading;
		}

		service.getPreviewList = function() {
			return storyPreviewList;
		}	
		
		// private methods
		var generatePreviews = function(stories){
			for(var id in stories) {
				var story = stories[id];
				storyPreviewList = {
					id: story.id,
					metadata: story.metadata
				};
			}
		};

		// init 
		service.reload();

		return service;
	});