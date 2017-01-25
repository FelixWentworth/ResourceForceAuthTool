angular
	.module('storyGameMaker')
	.factory('StoryService', ['$http', '$q', function($http, $q) {
		var service = {};

		// private variables
		var storyPromise = $q.defer();
		var isLoaded = false;
		var stories = {};

		// private methods
		function load() {
			$http.get("data/demo/story-demo.json")
				.then(function(story){
					isLoaded = true;
					storyPromise.resolve(story.data);					
				});
		};

		// public methods
		service.getById = function(id) {
			return service.getStories().then(function(stories){
				var story = stories.find(s => s.id == id);

				if(story != null) {
					return story;
				} 

				throw "Couldn't find story for id: " + id;
			});
		};

		service.getStories = function() {
			if(!isLoaded) {
				load();
			}
			return storyPromise.promise;
		}
		
		return service;
	}]);