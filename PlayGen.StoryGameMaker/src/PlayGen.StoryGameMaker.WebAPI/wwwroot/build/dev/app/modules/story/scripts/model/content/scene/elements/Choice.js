"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Choice = function Choice() {
	_classCallCheck(this, Choice);

	var self = this;

	self._type = "Choice";
	self.action = new Subscene();
	self.scene = new Scene();

	self.action.action = new ChoiceAction();
};
//# sourceMappingURL=Choice.js.map
