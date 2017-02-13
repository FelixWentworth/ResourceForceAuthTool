angular
	.module("story")
	.component("storyCharacters", {		
		templateUrl: "app/modules/story/components/characters/story-characters.html",
		bindings: {
			characters: "<"
		}
	});