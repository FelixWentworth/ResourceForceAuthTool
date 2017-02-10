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
				if(ctrl.scene.choices.length == 1) {
					alert("A scene must have at least one choice." +
						" \n\nEither modify this choice or remove this " +
						"scene if you don't want to keep it.");
				} else {
					ArrayUtil.tryRemove(ctrl.scene.choices, choice);
				}
			};

			ctrl.addChoiceScene = function(choice) {
				choice.scene = new Scene();
				choice.scene.choices.push(new Choice());
			}

			ctrl.removeChoiceScene = function(choice) {
				choice.scene = null;
			}
		}
	});