angular
	.module("story")
	.component("storySubsceneEditor", {
		templateUrl: "modules/story/components/subscene-editor/story-subscene-editor.html",
		bindings: {
			subscene: "="
		},
		controller: function() {
			var ctrl = this;

			// public fields
			ctrl.elementSplitter = new SubsceneElementSplitter();
			
			// public methods
			ctrl.$onInit = function () {
				ctrl.elementSplitter.setElements(ctrl.subscene.elements);
			};
		}
	});