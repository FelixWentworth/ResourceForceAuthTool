angular
	.module("story")
	.factory("StoryService", ["$http", "$q", function($http, $q) {
		var service = {};

		// private variables
		var storyPromise = $q.defer();
		var storiesMetadataPromise = $q.defer();

		var dbHandler = new DBHandler();

		// private methods
		function load() {
			$http.get("data/demo/story-demo.json")
				.then(function(story){
					storyPromise.resolve(story.data);		
				});
		};

		function getStories() {
			load();
			return storyPromise.promise;
		}

		function updateMemoryCache(story) {
			return getStories()
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
			return getStories()
				.then(function(stories){
					var story = stories.find(s => s.id == id);

					if(story != null) {
						return story;
					} 

					throw "Couldn't find story for id: " + id;
				});
		};		

		service.getStoriesMetadata = function () {
			getStories()
				.then(function(stories) {
					var metadatas = [];

					stories.forEach(s => {
						metadatas.push(s.metadata)
					});

					storiesMetadataPromise.resolve(metadatas);
				});

			return storiesMetadataPromise.promise;
		};

		service.save = function(story) {
			return updateMemoryCache(story)
				.then(updateLocalStorageCache);
		};
		
		service.getNewStoryId = function() {
			return "temp-new-story-id";
		};

		return service;
	}]);