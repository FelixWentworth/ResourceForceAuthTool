angular
	.module("story")
	.factory("StoryStorageService", ["$http", "$q", function($http, $q) {
		var service = {};

		// private variables
		var storiesPromise = null;
		var storiesMetadataPromise = null;
		var creatorId = null;

		// private methods
		function getStories(id) {
			// get new data every time
			storiesPromise = $q.defer();		
			
			$http.get('../api' + '/scenario/createdby/' + id)
				.then(function(story){
					storiesPromise.resolve(story.data);		
				});

			return storiesPromise.promise;
		}

		function getStory(id) {
			// get new data every time
			storiesPromise = $q.defer();		
			
			$http.get('../api' + '/scenario/' + id)
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

		service.getStoriesMetadata = function (id) {
			// get new data every time
			storiesMetadataPromise = $q.defer();

			creatorId = id;

			getStories(id)
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
			story.metadata.creatorId = creatorId;
			story.metadata.isValid = false;
			story.metadata.submitted = false;
			story.metadata.deleted = false;
			return $http.post('../api' + '/scenario', story);
		};

		service.update = function(story){
			return $http.update('../api' + '/scenario', story);
		};
		
		service.getNewStoryId = function() {
			return "temp-new-story-id";
		};

		return service;
	}]);