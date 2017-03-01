"use strict";

angular.module("story").component("storyMessagePlayer", {
	templateUrl: "modules/story/components/message-player/story-message-player.html",
	bindings: {
		story: "<",
		isComplete: "="
	},
	controller: function controller() {
		var ctrl = this;

		ctrl.sceneElementsHistory = [];
		ctrl.sceneElements = [];

		// public methods
		ctrl.applyChoice = function (choice) {
			choice.__wasSelected = true;

			setEnabled(ctrl.sceneElements, false);

			ctrl.sceneElementsHistory = ctrl.sceneElementsHistory.concat(ctrl.sceneElements);
			ctrl.sceneElements = choice.scene.elements;

			setEnabled(ctrl.sceneElements, true);

			ctrl.isComplete = Array.containsWhere(ctrl.sceneElements, function (e) {
				return e._type == "End";
			});
		};

		ctrl.$onInit = function () {
			ctrl.sceneElements = ctrl.story.content.scene.elements;

			setEnabled(ctrl.sceneElements, true);
			ctrl.isComplete = false;
		};

		// private methods
		function setEnabled(elements, isEnabled) {
			elements.forEach(function (e) {
				e.__isEnabled = isEnabled;

				if (e._type == "Subscene") {
					setSubsceneEnabled(e, isEnabled);
				} else if (e._type == "Choice") {
					setSubsceneEnabled(e.action, isEnabled);
					setEnabled(e.scene.elements, isEnabled);
				}
			});
		};

		function setSubsceneEnabled(subscene, isEnabled) {
			subscene.action.__isEnabled = isEnabled;
			setEnabled(subscene.reactions, isEnabled);
		};
	}
});
//# sourceMappingURL=story-message-player.component.js.map
