angular
	.module("storyGameMaker")
	.component("storyCharacters", {		
		templateUrl: "app/components/story/characters/story-characters.html",
		bindings: {
			characters: "<"
		}
	});