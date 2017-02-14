angular
	.module("story")
	.component("sceneElementCharacter", {		
		templateUrl: "app/modules/story/components/scene-elements/character/scene-element-character.html",
		bindings: {
			character: "<"
		}
	});