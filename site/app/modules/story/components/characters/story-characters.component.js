angular
	.module("story")
	.component("storyCharacters", {		
		templateUrl: "modules/story/components/characters/story-characters.html",
		bindings: {
			characters: "<"
		}
	});