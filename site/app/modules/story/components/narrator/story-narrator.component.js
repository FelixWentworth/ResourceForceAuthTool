angular
	.module("story")
	.component("storyNarrator", {		
		templateUrl: "modules/story/components/narrator/story-narrator.html",
		bindings: {
			narrator: "<"
		}
	});