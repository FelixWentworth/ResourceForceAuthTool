angular
	.module("story")
	.component("storyTreeView", {		
		templateUrl: "/modules/story/components/tree-view/story-tree-view.html",
		bindings: {
			story: "<"
		}
	});