class SubsceneElementSplitter {
	constructor() {
		var self = this;

		// public fields
		self.interaction = null;
		self.responses = [];			

		// public methods
		self.setElements = function (subsceneElements) {
			subsceneElements.forEach(subsceneElement => {
				switch(subsceneElement._type) {
					case "Narrator":
					case "ChoiceAction":
						setInteraction(subsceneElement);
						break;

					case "Character":
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
			if(self.interaction == null) {
				self.interaction = subsceneElement;
			} else {
				throw "Interaction already set. There shouldn't be more than one per subscene";
			}
		};

		var addResponse = function (subsceneElement) {
			self.responses.push(subsceneElement);
		};
	}
}