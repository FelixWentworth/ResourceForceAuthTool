angular
	.module("story")
	.component("storyCharacter", {		
		templateUrl: "modules/story/components/character/story-character.html",
		bindings: {
			character: "<"
		}
	});