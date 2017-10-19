angular
	.module("story")
	.factory("StoryStorageService", ["$http", "$q", function($http, $q) {
		var service = {};

		// private variables
		var storiesPromise = null;
		var storiesMetadataPromise = null;
		var requestsPromise = null;
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

					throw "Couldn't find scenario for id: " + id;
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

		service.submitStory = function (story) {
			story.metadata.submitted = true;
			return $http.post('../api' + '/scenario', story);
		};

		service.save = function (story) {
			story.metadata.creatorId = creatorId;
			story.metadata.isValid = false;
			story.metadata.submitted = false;
			story.metadata.deleted = false;
			return $http.post('../api' + '/scenario', story);
		};

		service.delete = function (story) {
			return $http.delete('../api' + '/scenario/', story.metadata.id);
		};

		service.update = function(story){
			return $http.put('../api' + '/scenario', story);
		};

		service.updateMetadata = function(metadata){
			var story = {};
			story.metadata = metadata;
			story.content = null;
			return $http.put('../api' + '/scenario/metadata', story);
		};
		
		service.getNewStoryId = function() {
			return "temp-new-story-id";
		};

		service.getValidatorRequests = function() {
            // get new data every time
			requestsPromise = $q.defer();		
			
			$http.get('../api' + '/accountrequest/validator')
				.then(function(request){	
					requestsPromise.resolve(request.data);		
				});

			return requestsPromise.promise;
		}
		
		service.submitValidatorRequest = function(request) {
			return $http.post('../api' + '/accountrequest/validator', request);
		}

		service.approveRequest = function(request){
			return $http.post('../api' + '/accountrequest/validator/true', request);			
		}

		service.rejectRequest = function(request){
			return $http.post('../api' + '/accountrequest/validator/false', request);			
		}

		return service;
	}]);