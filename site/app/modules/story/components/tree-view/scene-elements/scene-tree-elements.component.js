angular
	.module("story")
	.component("sceneTreeElements", {		
		templateUrl: "modules/story/components/tree-view/scene-elements/scene-tree-elements.html",
		bindings: {
			elements: "<"
		}
	});