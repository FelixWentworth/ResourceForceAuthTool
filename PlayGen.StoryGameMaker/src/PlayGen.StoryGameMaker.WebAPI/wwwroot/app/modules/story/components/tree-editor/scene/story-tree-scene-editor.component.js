angular
	.module("story")
	.component("storyTreeSceneEditor", {
		templateUrl: "modules/story/components/tree-editor/scene/story-tree-scene-editor.html",
		bindings: {
			scene: "=",
			onClicked: "="
		},
		controller: ["StoryEditorService", function(StoryEditorService) {
			var ctrl = this;

			// public methods
			ctrl.removeElement = function(element) {
				Array.remove(ctrl.scene.elements, element);
			};

			ctrl.doesntContain = function(types) {
				var containsWhereType = false;
				for(var i in types) {
					if(Array.containsWhere(ctrl.scene.elements, e => e._type == types[i])) {
						containsWhereType = true;
						break;
					}
				}

				return !containsWhereType;
			}

			ctrl.addNarrator = function () {	
				var narratorSubscene = StoryEditorService.createNarratorSubscene();
				ctrl.scene.elements.push(narratorSubscene);
			};

			ctrl.addCharacter = function () {

				// todo sleetc character name
				var selectedCharacter = new Character("Sue");

				var characterSubscene = StoryEditorService.createCharacterSubscene(selectedCharacter);
				ctrl.scene.elements.push(characterSubscene);
			};

			ctrl.addChoice = function () {
				var choiceCount = 0;
				ctrl.scene.elements.forEach(e => choiceCount += e._type == "Choice" ? 1 : 0);

				var choiceName = ctrl.scene.name + "." + (choiceCount + 1);

				var choice = StoryEditorService.createChoice(choiceName);
				ctrl.scene.elements.push(choice);
			};

			ctrl.addEnd = function () {
				var end = StoryEditorService.createEnd();
				ctrl.scene.elements.push(end);
			};

			ctrl.$onInit = function () {
				if(ctrl.scene._type == "Choice") {
					ctrl.choice = ctrl.scene;
					ctrl.scene = ctrl.choice.scene;
					// todo make data driven
					ctrl.label = "Choice";
				} else {
					ctrl.label = "Scene";
				}
			}
		}]
	});