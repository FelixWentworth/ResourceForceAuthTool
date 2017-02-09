class DBHandler {
	constructor () {
		var self = this;

		// private variables
		var name = "StoryGameMaker";
/*
		// public methods 
		self.rewriteDatabase = function(stories) {
			var deleteRequest = window.indexedDB.DeleteDatabase("")


			function writeCache() {
			return service.getStories()
				.then(function(stories){				
					var request = indexedDB.open("StoryGameMaker");

					request.onerror = function(event) {
						throw "Failed to open StoryGameMaker IndexedDB";
					}

					request.onupgradeneeded = function(event) {
						// Create db
						db = event.target.result;
						var objectStore = db.createObjectStore("stories", {keyPath: "id"});

						// add data
						objectStore.transaction.oncomplete = function(event) {
							var storyObjectStore = db.transaction("stories", "readwrite").objectStore("stories");
							stories.forEach(story => {
								storyObjectStore.add(story);
							});
						}					
					}
				});
		}

		
		}*/
	}
}