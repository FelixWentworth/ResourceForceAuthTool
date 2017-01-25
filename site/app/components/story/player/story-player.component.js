angular
	.module('storyGameMaker')
	.component('storyPlayer', {
		templateUrl: "app/components/story/player/story-player.html",
		bindings: {
			story: "<"
		},
		controller: function() {
			var ctrl = this;
			
			ctrl.$onInit = function() {
				ctrl.storyPlayer = new StoryPlayer(ctrl.characters, ctrl.story.scene);
			}
		}
	});