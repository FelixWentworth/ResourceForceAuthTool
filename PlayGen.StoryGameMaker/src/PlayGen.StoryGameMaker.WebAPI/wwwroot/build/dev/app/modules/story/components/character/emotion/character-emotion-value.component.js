"use strict";

angular.module("story").component("characterEmotionValue", {
	templateUrl: "modules/story/components/character/emotion/character-emotion-value.html",
	bindings: {
		value: "<"
	},
	controller: function controller() {
		var ctrl = this;

		ctrl.mappings = {
			glee: "app/modules/story/images/emotions/glee.png",
			happy: "app/modules/story/images/emotions/happy.png",
			neutral: "app/modules/story/images/emotions/neutral.png",
			sad: "app/modules/story/images/emotions/sad.png",
			upset: "app/modules/story/images/emotions/upset.png",
			angry: "app/modules/story/images/emotions/angry.png",
			none: "app/modules/story/images/emotions/none.png"
		};
	}
});
//# sourceMappingURL=character-emotion-value.component.js.map
