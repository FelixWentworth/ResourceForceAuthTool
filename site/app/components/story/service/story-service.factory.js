angular
	.module('storyGameMaker')
	.factory('StoryService', ['$http', '$q', function($http, $q) {
		// instance
		var service = {};
		var storyPromise = $q.defer();
		var isLoaded = false;

		// private variables
		var stories = {};

		// private methods
		function load() {
			$http.get("app/data/demo/story-demo.json")
				.then(function(story){
					isLoaded = true;
					storyPromise.resolve(story.data);					
				});
		};

		// public methods
		service.getById = function(id) {
			return getStories.then(function(stories){
				var story = stories.find(function(story){
					return story.id == id;
				})

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