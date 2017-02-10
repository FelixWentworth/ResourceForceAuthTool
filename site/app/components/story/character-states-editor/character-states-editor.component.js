angular
	.module("storyGameMaker")
	.component("characterStatesEditor", {		
		templateUrl: "app/components/story/character-states-editor/character-states-editor.html",
		bindings: {
			states: "="
		},
		controller : function() {
			var ctrl = this;

			ctrl.addState = function () {
				ctrl.states.push({});
			};

			ctrl.removeState= function (state) {
				ArrayUtil.tryRemove(ctrl.states, state);
			}
		}
	});