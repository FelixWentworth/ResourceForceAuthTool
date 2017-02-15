angular
	.module("story")
	.component("storyMessagePlayer", {
		templateUrl: "app/modules/story/components/message-player/story-message-player.html",
		bindings: {
			story: "<"
		},
		controller: function() {
			var ctrl = this;

			ctrl.sceneElementsHistory = [];
			ctrl.sceneElements = [];

			// public methods
			ctrl.applyChoice = function(choice) {
				ctrl.sceneElements.forEach(e => e.disabled = true);
				ctrl.sceneElementsHistory = ctrl.sceneElementsHistory.concat(ctrl.sceneElements);
				ctrl.sceneElements = choice.elements;
			};
			
			ctrl.$onInit = function() {
				ctrl.sceneElements = ctrl.story.scene.elements;
			}
		}
	});