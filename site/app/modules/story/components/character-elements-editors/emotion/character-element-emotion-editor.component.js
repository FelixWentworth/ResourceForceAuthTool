angular
	.module("story")
	.component("characterElementEmotionEditor", {		
		templateUrl: "app/modules/story/components/character-elements-editors/emotion/character-element-emotion-editor.html",
		bindings: {
			emotion: "="
		}, 
		controller: function() {
			var ctrl = this;

			ctrl.imageIdPaths = {
				"glee": "app/modules/story/images/emotions/glee.png",
				"happy": "app/modules/story/images/emotions/happy.png",
				"neutral": "app/modules/story/images/emotions/neutral.png",
				"sad": "app/modules/story/images/emotions/sad.png",
				"angry": "app/modules/story/images/emotions/angry.png",
				"upset": "app/modules/story/images/emotions/upset.png",
			};
		}
	});