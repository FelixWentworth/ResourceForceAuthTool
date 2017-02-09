angular
	.module("storyGameMaker")
	.factory("StoryService", ["$http", "$q", function($http, $q) {
		var service = {};

		// private variables
		var storyPromise = $q.defer();
		var isLoaded = false;
		var dbHandler = new DBHandler();

		// private methods
		function load() {
			$http.get("data/demo/story-demo.json")
				.then(function(story){
					isLoaded = true;
					storyPromise.resolve(story.data);					
				});
		};

		function updateMemoryCache(story) {
			return service.getStories()
				.then(function(stories){
					var existingIndex = stories.findIndex(s => s.id == story.id);

					if(0 <= existingIndex && existingIndex < stories.length) {
						stories.splice(existingIndex, 1);
					}

					stories.splice(0, 0, story);
				});
		}

		function updateLocalStorageCache(story) {
			// todo update local db representation
		}

		// public methods
		service.getById = function(id) {
			return service.getStories()
				.then(function(stories){
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

		service.save = function(story) {
			return updateMemoryCache(story)
				.then(updateLocalStorageCache);
		};
		
		return service;
	}]);