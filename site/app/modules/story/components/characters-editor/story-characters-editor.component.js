angular
	.module("story")
	.component("storyCharactersEditor", {		
		templateUrl: "app/modules/story/components/characters-editor/story-characters-editor.html",
		bindings: {
			characters: "="
		},
		controller: function() {
			var ctrl = this;
			
			ctrl.addCharacter = function (character) {
				if(Array.containsWhere(ctrl.characters, c => c.name == character.name)) {
					alert("There is already a character named: " + name 
						+ " \nThere cannot be two characters with the same name.");
				} else {
					ctrl.characters.push(character);
				}				
			};

			ctrl.removeCharacter = function (character) {
				Array.removeWhere(ctrl.characters, c => c.name == character.name);
			};
		}
	});