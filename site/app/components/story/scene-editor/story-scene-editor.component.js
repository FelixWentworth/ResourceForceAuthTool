angular
	.module("storyGameMaker")
	.component("storySceneEditor", {		
		templateUrl: "app/components/story/scene-editor/story-scene-editor.html",
		bindings: {
			scene: "="
		},
		controller: function () {
			var ctrl = this;

			ctrl.addChoice = function() {
				ctrl.scene.choices.push(new Choice());
			};

			ctrl.removeChoice = function (choice) {
				ArrayUtil.tryRemove(ctrl.scene.choices, choice);
			};
		}
	});