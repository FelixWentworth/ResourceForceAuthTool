angular
	.module("story")
	.component("storyMessagePlayer", {
		templateUrl: "modules/story/components/message-player/story-message-player.html",
		bindings: {
			story: "<",
			isComplete: "="
		},
		controller: function() {
			var ctrl = this;

			ctrl.sceneElementsHistory = [];
			ctrl.sceneElements = [];

			// public methods
			ctrl.applyChoice = function(choice) {
				choice.selected = true;
				ctrl.sceneElements.forEach(e => e.disabled = true);
				ctrl.sceneElementsHistory = ctrl.sceneElementsHistory.concat(ctrl.sceneElements);
				ctrl.sceneElements = choice.scene.elements;

				ctrl.isComplete = Array.containsWhere(ctrl.sceneElements, e => e._type == "End");
			};
			
			ctrl.$onInit = function() {
				ctrl.sceneElements = ctrl.story.content.scene.elements;
				ctrl.isComplete = false;
			}
		}
	});