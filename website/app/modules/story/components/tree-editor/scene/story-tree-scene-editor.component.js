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

			// public variables
			ctrl.isThisSceneLevelComplete = false;

			ctrl.feedbackOptions = [1,2,3,4,5];

			// public methods
			ctrl.removeElement = function(element) {
				Array.remove(ctrl.scene.elements, element);
				checkValidity();
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

				// todo remove
				checkValidity();
			};


			ctrl.openAddCharacterMenu = function ($mdMenu, event) {
				if(ctrl.characters.length == 0) {
					alert("You need to have at least 2 characters in your story.");
				}
				else {
					$mdMenu.open(event);
				}
			};

			ctrl.addCharacter = function (character) {
				var characterSubscene = StoryEditorService.createCharacterSubscene(character);
				ctrl.scene.elements.push(characterSubscene);
			};

			ctrl.addChoice = function () {
				var choiceCount = 0;
				ctrl.scene.elements.forEach(e => choiceCount += e._type == "Choice" ? 1 : 0);

				var choiceName = ctrl.scene.name + "." + (choiceCount + 1);

				var choice = StoryEditorService.createChoice(choiceName);
				ctrl.scene.elements.push(choice);

				checkValidity();
			};

			// TODO Add defined choices
			ctrl.addChoice = function (type) {
				var choiceCount = 0;
				ctrl.scene.elements.forEach(e => choiceCount += e._type == "Choice" ? 1 : 0);

				var choiceName = type;//ctrl.scene.name + "." + (choiceCount + 1);

				var choice = StoryEditorService.createChoice(choiceName);
				ctrl.scene.elements.push(choice);

				checkValidity();
			};


			ctrl.addEnd = function () {
				var end = StoryEditorService.createEnd();
				ctrl.scene.elements.push(end);

				checkValidity();
			};

			ctrl.$onInit = function () {
				if(ctrl.scene._type == "Choice") {
					ctrl.choice = ctrl.scene;
					ctrl.scene = ctrl.choice.scene;
					// todo make data driven
					ctrl.label = "Choice";
				} else {
					ctrl.label = "Incident Title";
				}

				// ctrl.characters = StoryEditorService.getCharacters();
			};

			ctrl.$postLink = function () {
				checkValidity();
			};

			// private methods
			function checkValidity() {				
				ctrl.isThisSceneLevelComplete = Array.containsWhere(ctrl.scene.elements, e => e._type == "End" || e._type == "Choice" );
				ctrl.form.$setValidity("incomplete", ctrl.isThisSceneLevelComplete);
			}
		}]
	});