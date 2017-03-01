"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Story = function Story(id) {
	_classCallCheck(this, Story);

	var self = this;

	self._type = "Story";
	self.metadata = new Metadata(id);
	self.content = new Content();
};
//# sourceMappingURL=Story.js.map
