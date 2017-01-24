angular
	.module('storyGameMaker')
	.component('storyTreeView', {		
		templateUrl: "app/components/story/tree-view/story-tree-view.html",
		bindings: {
			story: '<'
		}
	});