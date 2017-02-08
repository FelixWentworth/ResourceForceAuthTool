angular
	.module("storyGameMaker")
	.component("storyTreeEditor", {		
		templateUrl: "app/components/story/tree-editor/story-tree-editor.html",
		bindings: {
			story: "<"
		}
	});