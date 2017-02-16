angular
	.module("story")
	.component("characterElementEmotionEditor", {		
		templateUrl: "modules/story/components/character-elements-editors/emotion/character-element-emotion-editor.html",
		bindings: {
			emotion: "="
		}, 
		controller: function() {
			var ctrl = this;

			ctrl.imageIdPaths = {
				"glee": "modules/story/images/emotions/glee.png",
				"happy": "modules/story/images/emotions/happy.png",
				"neutral": "modules/story/images/emotions/neutral.png",
				"sad": "modules/story/images/emotions/sad.png",
				"angry": "modules/story/images/emotions/angry.png",
				"upset": "modules/story/images/emotions/upset.png",
			};
		}
	});