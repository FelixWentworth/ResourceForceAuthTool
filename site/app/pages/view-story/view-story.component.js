angular
	.module('storyGameMaker')
	.component('viewStory', {
		templateUrl: "app/story/pages/view-story/view-story.html",
		controller: function() {
			var ctrl = this;
		},
		bindings: {
			storyId: '<'
		}
	});