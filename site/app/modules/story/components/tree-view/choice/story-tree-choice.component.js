angular
	.module("story")
	.component("storyTreeChoice", {		
		templateUrl: "modules/story/components/tree-view/choice/story-tree-choice.html",
		bindings: {
			choice: "<"
		}
	});