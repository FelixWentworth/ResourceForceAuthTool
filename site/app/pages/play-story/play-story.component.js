angular
	.module('storyGameMaker')
	.component('playStory', {
		templateUrl: "app/pages/play-story/play-story.html",
		bindings: {
			storyId: '<'
		},
		controller: function() {
			var ctrl = this;
		}		
	});