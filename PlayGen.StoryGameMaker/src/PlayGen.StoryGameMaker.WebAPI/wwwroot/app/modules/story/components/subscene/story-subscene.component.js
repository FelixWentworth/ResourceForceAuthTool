angular
	.module("story")
	.component("storySubscene", {		
		templateUrl: "modules/story/components/subscene/story-subscene.html",
		bindings: {
			subscene: "<",
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