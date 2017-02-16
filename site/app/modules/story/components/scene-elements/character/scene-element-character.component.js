angular
	.module("story")
	.component("sceneElementCharacter", {		
		templateUrl: "modules/story/components/scene-elements/character/scene-element-character.html",
		bindings: {
			character: "<"
		}
	});