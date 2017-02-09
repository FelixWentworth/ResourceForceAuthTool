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
				ctrl.dirtyCharacters.push(new Character());
			};

			ctrl.submit = function () {
				ctrl.characters = angular.copy(ctrl.dirtyCharacters);
			};

			ctrl.$onInit = function() {
				ctrl.dirtyCharacters = angular.copy(ctrl.characters);
			}
		}
	});