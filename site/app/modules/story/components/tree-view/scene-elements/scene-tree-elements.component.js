angular
	.module("story")
	.component("sceneTreeElements", {		
		templateUrl: "app/modules/story/components/tree-view/scene-elements/scene-tree-elements.html",
		bindings: {
			elements: "<"
		}
	});