angular
	.module("story")
	.component("messagePlayerChoice", {		
		templateUrl: "modules/story/components/message-player/scene-elements/choice/message-player-choice.html",
		bindings: {
			choice: "<",
			apply: "="
		}, 
		controller: function () {
			var ctrl = this;

			ctrl.$onInit = function () {
				ctrl.choiceAction = Array.single(ctrl.choice.action.elements, e => e._type == "ChoiceAction");				
			};
		}
	});