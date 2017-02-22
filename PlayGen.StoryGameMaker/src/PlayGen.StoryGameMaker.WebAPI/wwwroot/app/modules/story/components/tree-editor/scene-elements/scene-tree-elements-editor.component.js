angular
	.module("story")
	.component("sceneTreeElementsEditor", {
		templateUrl: "modules/story/components/tree-editor/scene-elements/scene-tree-elements-editor.html",
		bindings: {
			elements: "="
		},
		controller: function() {
			var ctrl = this;

			ctrl.removeElement = function(element) {
				Array.removeWhere(ctrl.elements, element);
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
		}
	});