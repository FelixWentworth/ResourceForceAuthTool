angular
	.module("story")
	.component("storyCharacterEditor", {		
		templateUrl: "/modules/story/components/character-editor/story-character-editor.html",
		bindings: {
			character: "="
		}
	});