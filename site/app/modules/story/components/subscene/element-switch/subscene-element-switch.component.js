angular
	.module("story")
	.component("subsceneElementSwitch", {		
		templateUrl: "modules/story/components/subscene/element-switch/subscene-element-switch.html",
		bindings: {
			element: "<",
			onElementClicked: "="
		}
	});