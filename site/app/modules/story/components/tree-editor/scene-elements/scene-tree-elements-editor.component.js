angular
	.module("story")
	.component("sceneTreeElementsEditor", {
		templateUrl: "app/modules/story/components/tree-editor/scene-elements/scene-tree-elements-editor.html",
		bindings: {
			elements: "="
		},
		controller: function() {
			var ctrl = this;

			ctrl.removeElement = function(element) {
				ArrayUtil.remove(ctrl.elements, element);
			};
		}
	});