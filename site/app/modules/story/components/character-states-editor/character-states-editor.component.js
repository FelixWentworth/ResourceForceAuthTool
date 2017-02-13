angular
	.module("story")
	.component("characterStatesEditor", {		
		templateUrl: "app/modules/story/components/character-states-editor/character-states-editor.html",
		bindings: {
			states: "="
		},
		controller : function() {
			var ctrl = this;

			ctrl.addState = function () {
				ctrl.states.push({});
			};

			ctrl.removeState= function (state) {
				if(ctrl.states.length == 1) {
					alert("Characters must have at least 1 emotional state.");
				} else {
					ArrayUtil.tryRemove(ctrl.states, state);
				}
			}
		}
	});