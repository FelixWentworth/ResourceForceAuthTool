angular
	.module('storyGameMaker')
	.component('storyPlayer', {
		templateUrl: "app/components/story/player/player.html",
		bindings: {
			story: "<"
		},
		controller: function(StoryService) {
			var ctrl = this;

			// init
			ctrl.$onInit = function() {

			}
		}
	});