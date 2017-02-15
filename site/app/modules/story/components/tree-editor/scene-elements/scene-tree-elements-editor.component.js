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

			ctrl.doesntContain = function(types) {
				var containsType = false;
				for(var i in types) {
					if(ArrayUtil.contains(ctrl.elements, e => e.$type == types[i])) {
						containsType = true;
						break;
					}
				}

				return !containsType;
			}
		}
	});