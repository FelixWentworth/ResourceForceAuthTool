angular
	.module("story")
	.component("characterEmotionValue", {		
		templateUrl: "modules/story/components/character/emotion/character-emotion-value.html",
		bindings: {
			value: "<"
		}
	});