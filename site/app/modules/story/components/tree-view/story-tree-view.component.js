angular
	.module("story")
	.component("storyTreeView", {		
		templateUrl: "app/modules/story/components/tree-view/story-tree-view.html",
		bindings: {
			story: "<"
		}
	});