angular
	.module("story")
	.component("storyCharactersEditor", {		
		templateUrl: "app/modules/story/components/characters-editor/story-characters-editor.html",
		bindings: {
			characters: "=",
			minChars: "<"
		},
		controller : function() {
			var ctrl = this;

			ctrl.addCharacter = function () {
				ctrl.characters.push(new Character());
			};

			ctrl.removeCharacter= function (character) {
				if(ctrl.minChars != null && ctrl.characters.length == ctrl.minChars) {
					alert("Cannot remove character." 
						+ " \nThe minimum amount of characters required is: " + ctrl.minChars);
				} else {
					ArrayUtil.tryRemove(ctrl.characters, character);
				}
			}
		}
	});