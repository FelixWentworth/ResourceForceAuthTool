angular
	.module("story")
	.component("storyCharacterSelectionEditor", {
		templateUrl: "modules/story/components/character-selection-editor/story-character-selection-editor.html",
		bindings: {
			selectedCharacters: "=",
			selectableCharacters: "<",
			minimumCharacters: "<"
		},
		controller: function() {
			var ctrl = this;

			// public methods
			ctrl.toggleSelected = function(character) {
				if(Array.contains(ctrl.selectedCharacters, character)) {
					character.__selected = false;
					Array.remove(ctrl.selectedCharacters, character);					
				} else {
					character.__selected = true;
					ctrl.selectedCharacters.push(character);					
				}

				updateValidity();
			};

			ctrl.$onInit = function () {
				ctrl.selectedCharacters.forEach(selectedCharacter => {

					Array.removeWhere(ctrl.selectableCharacters, c => c.name == selectedCharacter.name);
					Array.insert(ctrl.selectableCharacters, 0, selectedCharacter);
					selectedCharacter.__selected = true;					
				});
			};

			ctrl.$postLink = function () {
				updateValidity();
			};

			// private methods
			function updateValidity() {
				ctrl.form.$setValidity("minimumCharacters", ctrl.selectedCharacters.length >= ctrl.minimumCharacters);
			}
		}
	});