angular
	.module('storyGameMaker')
	.component('editStory', {
		templateUrl: "app/story/pages/edit-story/edit-story.html",
		controller: function() {
			var ctrl = this;
		},
		bindings: {
			storyId: '<'
		}
	});