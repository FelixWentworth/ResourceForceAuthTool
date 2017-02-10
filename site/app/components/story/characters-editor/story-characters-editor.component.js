angular
	.module("storyGameMaker")
	.component("storyCharactersEditor", {		
		templateUrl: "app/components/story/characters-editor/story-characters-editor.html",
		bindings: {
			characters: "="
		},
		controller : function() {
			ctrl = this;

			ctrl.addCharacter = function () {
				ctrl.characters.push(new Character());
			};

			ctrl.removeCharacter= function (character) {
				var index = ctrl.characters.findIndex(c => c.name == character.name);

				if(0 <= index && index < ctrl.characters.length) {
					ctrl.characters.splice(index, 1);
				} else {
					throw "Character to remove was not found in the list of characters." + 
						" \nName: " + character.name;
				}
			}
		}
	});