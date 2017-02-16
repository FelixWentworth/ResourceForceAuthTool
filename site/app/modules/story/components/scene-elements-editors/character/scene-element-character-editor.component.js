angular
	.module("story")
	.component("sceneElementCharacterEditor", {		
		templateUrl: "app/modules/story/components/scene-elements-editors/character/scene-element-character-editor.html",
		bindings: {
			character: "="
		},
		controller: function() {
			var ctrl = this;

			ctrl.removeElement = function(element) {
				Array.removeWhere(ctrl.character.elements, element);
			};
		}
	});