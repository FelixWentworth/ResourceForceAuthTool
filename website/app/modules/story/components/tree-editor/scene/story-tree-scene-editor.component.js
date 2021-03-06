angular
	.module("story")
	.component("storyTreeSceneEditor", {
		templateUrl: "/modules/story/components/tree-editor/scene/story-tree-scene-editor.html",
		bindings: {
			scene: "=",
			parentScene: "=",
			onClicked: "="
		},
		controller: ["StoryEditorService", "config", function(StoryEditorService, config) {
			var ctrl = this;

			// public variables
			ctrl.isThisSceneLevelComplete = false;
			
			ctrl.severity = config.content.severity;

			ctrl.officerOptions = config.content.officers;
			ctrl.turnOptions = config.content.turns;
			ctrl.impactOptions = config.content.impact;
			ctrl.feedbackOptions = config.content.feedback;

			ctrl.descriptionMin = config.constraints.description.min;
			ctrl.descriptionMax = config.constraints.description.max;

			ctrl.titleMin = config.constraints.title.min;
			ctrl.titleMax = config.constraints.title.max;

			ctrl.feedbackMin = config.constraints.feedback.min;
			ctrl.feedbackMax = config.constraints.feedback.max;

			// private variables
			let defaultImpactOption = ctrl.impactOptions[0];

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

			ctrl.changeImpact = function () {
				checkEnd();
				checkValidity();
			}

			ctrl.hasValidSatisfactionImpact = function() {
				return ctrl.scene.satisfactionImpact !== defaultImpactOption.id && ctrl.scene.satisfactionImpact != null;
			};

			ctrl.getChoiceCount = function() {
				let choiceCount = 0;
				ctrl.scene.choices.forEach(e => choiceCount += e._type == "Choice" ? 1 : 0);
				return choiceCount;
			}

			// private methods
			function checkValidity() {			
				let choiceCount = ctrl.getChoiceCount();

				if (choiceCount == 1)
				{
					// Player must have either no choices (an end) or more than 2 (a choice with 1 free choice, citizen or ignore)
					ctrl.isThisSceneLevelComplete = false;
				}
				else if (choiceCount == 0)
				{					
					ctrl.isThisSceneLevelComplete = ctrl.hasValidSatisfactionImpact();
				}
				else
				{
					ctrl.isThisSceneLevelComplete = true;
				}
				
				ctrl.form.$setValidity("incomplete", ctrl.isThisSceneLevelComplete);

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