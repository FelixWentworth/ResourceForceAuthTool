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

			ctrl.severity = [1, 2, 3];

			ctrl.officerOptions = [0,1,2,3,4];
			ctrl.turnOptions = [0,1,2,3,4];
			ctrl.impactOptions = [-5,-4,-3,-2,-1,0,1,2,3,4,5];
			ctrl.feedbackOptions = [1,2,3,4,5];

			// public methods
			ctrl.removeElement = function(element) {
				Array.remove(ctrl.scene.choices, element);
				checkValidity();
			};

			ctrl.doesntContain = function(types) {
				var containsWhereType = false;
				for(var i in types) {
					if(Array.containsWhere(ctrl.scene.choices, e => e._type == types[i])) {
						containsWhereType = true;
						break;
					}
				}

				return !containsWhereType;
			}

			ctrl.doesntContainChoice = function(choice)
			{
				if (ctrl.scene.choices.length == 0)
				{
					return true;
				}
				var containsWhereChoice = false;
				for(var i in choice) {
					if(Array.containsWhere(ctrl.scene.choices, e => e._type == "Choice" && e.choice.choiceType == choice[i])) {
						containsWhereChoice = true;
						break;
					}
				}

				return !containsWhereChoice;
			}

			// ctrl.addNarrator = function () {	
			// 	var narratorSubscene = StoryEditorService.createNarratorSubscene();
			// 	ctrl.scene.choices.push(narratorSubscene);

			// 	// todo remove
			// 	checkValidity();
			// };


			// ctrl.openAddCharacterMenu = function ($mdMenu, event) {
			// 	if(ctrl.characters.length == 0) {
			// 		alert("You need to have at least 2 characters in your story.");
			// 	}
			// 	else {
			// 		$mdMenu.open(event);
			// 	}
			// };

			// ctrl.addCharacter = function (character) {
			// 	var characterSubscene = StoryEditorService.createCharacterSubscene(character);
			// 	ctrl.scene.choices.push(characterSubscene);
			// };

			ctrl.addChoice = function () {
				var choiceCount = 0;
				ctrl.scene.choices.forEach(e => choiceCount += e._type == "Choice" ? 1 : 0);

				var choiceName = ctrl.scene.name + "." + (choiceCount + 1);

				var choice = StoryEditorService.createChoice(choiceName);
				ctrl.scene.choices.push(choice);

				checkEnd();
				checkValidity();
			};

			// TODO Add defined choices
			ctrl.addChoice = function (type) {
				var choiceCount = 0;
				ctrl.scene.choices.forEach(e => choiceCount += e._type == "Choice" ? 1 : 0);

				var choiceName = type;//ctrl.scene.name + "." + (choiceCount + 1);

				var choice = StoryEditorService.createChoice(choiceName);
				ctrl.scene.choices.push(choice);


				checkEnd();
				checkValidity();
			};


			ctrl.addEnd = function () {
				var end = StoryEditorService.createEnd();
				ctrl.scene.choices.push(end);

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

				var choices = 0;
				ctrl.scene.choices.forEach(e => choices += e._type == "Choice" ? 1 : 0);
				if (choices == 1)
				{
					// Player must have either no choices (an end) or more than 2 (a choice with 1 free choice, citizen or ignore)
					ctrl.isThisSceneLevelComplete = false;
				}
				else
				{
					ctrl.isThisSceneLevelComplete = true;
				}
				
				ctrl.form.$setValidity("incomplete", ctrl.isThisSceneLevelComplete);
				console.log(ctrl.scene._type + " : " + choices);	

				

				// if (ctrl.scene.choices.length > 1)
				// {
				// 	ctrl.isThisSceneLevelComplete = Array.containsWhere(ctrl.scene.choices, e => e._type == "Choice" && (e.choiceType == "Ignore" || e.choiceType == "Citizen") );
				// 	ctrl.form.$setValidity("incomplete", ctrl.isThisSceneLevelComplete);
				// }
				checkEnd();
			}

			function checkEnd() {
				// add an end if one does not already exist
				var ends = 0;
				ctrl.scene.choices.forEach(e => ends += e._type == "End" ? 1 : 0);
				if (ends == 0)
				{
					ctrl.addEnd();
				}
			}
		}]
	});