angular
	.module("story")
	.component("characterElementEmotionEditor", {		
		templateUrl: "app/modules/story/components/character-elements-editors/emotion/character-element-emotion-editor.html",
		bindings: {
			emotion: "="
		}, 
		controller: function() {
			var ctrl = this;

			ctrl.emotionOptions = ["placeholder 1", "placeholder 2", "placeholder 3"];
		}
	});