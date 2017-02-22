// todo rename this to story-storage

angular
	.module("story")
	.factory("StoryService", ["$http", "$q", function($http, $q) {
		var service = {};

		// private variables
		var storiesPromise = null;
		var storiesMetadataPromise = null;

		// private methods
		function getStories() {
			// get new data every time
			storiesPromise = $q.defer();		
			
			$http.get("data/demo/story-demo.json")
				.then(function(story){
					storiesPromise.resolve(story.data);		
				});

			return storiesPromise.promise;
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

		// public methods
		service.getById = function(id) {
			return getStories()
				.then(function(stories){
					var story = stories.find(s => s.metadata.id == id);

					if(story != null) {
						return story;
					} 

					throw "Couldn't find story for id: " + id;
				});
		};		

		service.getStoriesMetadata = function () {
			// get new data every time
			storiesMetadataPromise = $q.defer();

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
			return updateMemoryCache(story);
		};
		
		service.getNewStoryId = function() {
			return "temp-new-story-id";
		};

		return service;
	}]);