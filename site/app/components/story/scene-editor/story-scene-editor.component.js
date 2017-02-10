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
				var index = ctrl.scene.choices.findIndex(c => c == choice);

				if(0 <= index && index < ctrl.scene.choices.length) {
					ctrl.scene.choices.splice(index, 1);
				} else {
					throw "Choice to remove was not found in the list of choices." + 
						" \nAction: " + choice.action;
				}
			};
		}
	});