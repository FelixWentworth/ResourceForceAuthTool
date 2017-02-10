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
				var index = ctrl.states.findIndex(s => s == state);

				if(0 <= index && index < ctrl.states.length) {
					ctrl.states.splice(index, 1);
				} else {
					throw "State to remove was not found in the list of states." + 
						" \nType: " + state.$type + " Value: " + state.value;
				}
			}
		}
	});