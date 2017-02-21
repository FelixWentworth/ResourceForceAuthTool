angular
	.module("story")
	.component("characterEmotionValue", {		
		templateUrl: "modules/story/components/character/emotion/character-emotion-value.html",
		bindings: {
			value: "<"
		}, 
		controller: function() {
			var ctrl = this;

			ctrl.mappings = {
				glee: "modules/story/images/emotions/glee.png",
				happy: "modules/story/images/emotions/happy.png",
				neutral: "modules/story/images/emotions/neutral.png",
				sad: "modules/story/images/emotions/sad.png",
				upset: "modules/story/images/emotions/upset.png",
				angry: "modules/story/images/emotions/angry.png",
				none: "modules/story/images/emotions/none.png",
			};
		}
	});