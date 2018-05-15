angular
	.module("story")
	.component("storyMessagePlayer", {
		templateUrl: "/modules/story/components/message-player/story-message-player.html",
		bindings: {
			story: "<",
			isComplete: "="
		},
		controller: ["config", function(config) {
			var ctrl = this;

			ctrl.sceneInformation = [];
			ctrl.sceneElements = [];
			ctrl.feedback = [];

			// public methods
			ctrl.applyChoice = function(choice) {
				choice.__wasSelected = true;
			
				setEnabled(ctrl.sceneElements, false);

				ctrl.sceneInformation = choice.scene;
				ctrl.sceneInformation.severity = config.content.severity.find(s => s.id == ctrl.sceneInformation.severity).name;
				if (ctrl.sceneInformation.satisfactionImpact >= -5 && ctrl.sceneInformation.satisfactionImpact <= 5)
				{
					ctrl.sceneInformation.satisfactionImpact = config.content.impact.find(s => s.id == ctrl.sceneInformation.satisfactionImpact).name;
				}
				else
				{
					ctrl.sceneInformation.satisfactionImpact = "None";
				}
				ctrl.sceneElements = choice.scene.choices;

				ctrl.feedback = choice.choice;
				ctrl.feedback.feedbackRating = config.content.feedback.find(s => s.id == choice.choice.feedbackRating).name;
				
				setEnabled(ctrl.sceneElements, true);				

				ctrl.isComplete = Array.containsWhere(ctrl.sceneElements, e => e._type == "End");
			};
			
			ctrl.$onInit = function() {
				ctrl.sceneInformation = ctrl.story.content.scene;
				ctrl.sceneInformation.severity = config.content.severity.find(s => s.id == ctrl.sceneInformation.severity).name;
				if (ctrl.sceneInformation.satisfactionImpact >= -5 && ctrl.sceneInformation.satisfactionImpact <= 5)
				{
					ctrl.sceneInformation.satisfactionImpact = config.content.impact.find(s => s.id == ctrl.sceneInformation.satisfactionImpact).name;
				}
				else
				{
					ctrl.sceneInformation.satisfactionImpact = "None";
				}
				ctrl.sceneElements = ctrl.story.content.scene.choices;

				setEnabled(ctrl.sceneElements, true);
				ctrl.isComplete = false;
			}

			// private methods
			function setEnabled(choices, isEnabled) {
				choices.forEach(e => {
					e.__isEnabled = isEnabled;

					if(e._type == "Subscene") {
						setSubsceneEnabled(e, isEnabled);
					} else if(e._type == "Choice") {
						setSubsceneEnabled(e.choice, isEnabled);
						setEnabled(e.scene.choices, isEnabled);
					}
				});
			};

			function setSubsceneEnabled(subscene, isEnabled) {
				subscene.__isEnabled = isEnabled;
			};
		}
		]});