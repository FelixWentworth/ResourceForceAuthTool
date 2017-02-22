angular
	.module("story")
	.component("sceneTreeElementsEditor", {
		templateUrl: "modules/story/components/tree-editor/scene-elements/scene-tree-elements-editor.html",
		bindings: {
			elements: "="
		},
		controller: ["StoryEditorService", function(StoryEditorService) {
			var ctrl = this;

			// public methods
			ctrl.removeElement = function(element) {
				Array.remove(ctrl.elements, element);
			};

			ctrl.doesntContain = function(types) {
				var containsWhereType = false;
				for(var i in types) {
					if(Array.containsWhere(ctrl.elements, e => e._type == types[i])) {
						containsWhereType = true;
						break;
					}
				}

				return !containsWhereType;
			}

			ctrl.addNarrator = function () {	
				var narratorSubscene = StoryEditorService.createNarratorSubscene();
				ctrl.elements.push(narratorSubscene);
			};

			ctrl.addCharacter = function () {

			};

			ctrl.addChoice = function () {

			};

			ctrl.addEnd = function () {

			};
		}]
	});