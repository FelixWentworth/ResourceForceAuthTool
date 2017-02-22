angular
	.module("story")
	.factory("StoryStorageService", ["$http", "$q", function($http, $q) {
		var service = {};

		// private variables
		var storiesPromise = null;
		var storiesMetadataPromise = null;

		// private methods
		function getStories() {
			// get new data every time
			storiesPromise = $q.defer();		
			
			$http.get('../api' + '/story')
				.then(function(story){
					storiesPromise.resolve(story.data);		
				});

			return storiesPromise.promise;
		}

		function getStory(id) {
			// get new data every time
			storiesPromise = $q.defer();		
			
			$http.get('../api' + '/story/' + id)
				.then(function(story){
					storiesPromise.resolve(story.data);		
				});

			return storiesPromise.promise;
		}

		// public methods
		service.getById = function(id) {
			return getStory(id)
				.then(function(story){
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
						metadatas.push(s)
					});

					storiesMetadataPromise.resolve(metadatas);
				});

			return storiesMetadataPromise.promise;
		};

		service.save = function (story) {
			return $http.post('../api' + '/story', story);
		};
		
		service.getNewStoryId = function() {
			return "temp-new-story-id";
		};

		return service;
	}]);