angular
	.module("storyGameMaker")
	.component("storyCharactersEditor", {		
		templateUrl: "app/components/story/characters-editor/story-characters-editor.html",
		bindings: {
			characters: "="
		},
		controller : function() {
			var ctrl = this;

			ctrl.addCharacter = function () {
				ctrl.characters.push(new Character());
			};

			ctrl.removeCharacter= function (character) {
				ArrayUtil.tryRemove(ctrl.characters, character);
			}
		}
	});