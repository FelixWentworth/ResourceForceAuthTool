angular
	.module("story")
	.component("characterEmotionEditor", {		
		templateUrl: "/modules/story/components/character-editor/emotion/character-emotion-editor.html",
		bindings: {
			emotion: "="
		}, 
		controller: function() {
			var ctrl = this;

			ctrl.isMenuVisible = false;

			// todo make data driven
			ctrl.config = {};
			ctrl.config.emotionValues = ["glee", "happy", "neutral", "sad", "upset", "angry" ];

			// public methods
			ctrl.showMenu = function() {
				ctrl.isMenuVisible = true;				
			};

			ctrl.select = function(emotionValue) {
				ctrl.emotion.value = emotionValue;
				ctrl.isMenuVisible = false;

				checkValidity();
			}

			ctrl.$postLink = function () {
				checkValidity()
			};

			// private methods
			function checkValidity() {
				ctrl.form.$setValidity("emotion", ctrl.emotion.value != "none");
			};
		}
	});