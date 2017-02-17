angular
	.module("story")
	.component("storySubscene", {		
		templateUrl: "modules/story/components/subscene/story-subscene.html",
		bindings: {
			subscene: "<"
		},
		controller: function() {
			var ctrl = this;

			// public fields
			ctrl.interaction = null;
			ctrl.responses = [];			

			// public methods
			ctrl.$onInit = function () {
				ctrl.subscene.elements.forEach(e => {
					switch(subsceneElement.type) {
						case "Narrator":
							setInteraction(subsceneElement);
							break;

						case "Charracter":
							if(subsceneElement.elements.length == 1 && subsceneElement.elements.length) {
								addResponse(subsceneElement);
							}
							else
							{
								setInteraction(subsceneElement);
							}
							break;

						default:
							throw "Unhandled subscene element type: " + subsceneElement.type;
					}
				});
			};

			// private methods
			var setInteraction = function (subsceneElement) {
				if(ctrl.interaction == null) {
					ctrl.interaction = subsceneElement;
				} else {
					throw "Interaction already set. There shouldn't be more than one per subscene";
				}
			};

			var addResponse = function (subsceneElement) {
				responses.push(subsceneElement);
			};
		}
	});