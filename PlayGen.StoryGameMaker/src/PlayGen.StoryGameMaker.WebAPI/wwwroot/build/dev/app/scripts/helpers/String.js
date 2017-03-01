"use strict";

// Usage: String.format("This is a {0} function to {1} a {3}.", "helper", "format", "string");
if (String.format) {
	throw "String.format is already defined somewhere else. This may lead to unexpected behaviour";
} else {
	String.format = function (format) {
		var args = Array.prototype.slice.call(arguments, 1);

		return format.replace(/{(\d+)}/g, function (match, number) {
			return typeof args[number] != 'undefined' ? args[number] : match;
		});
	};
}
//# sourceMappingURL=String.js.map
