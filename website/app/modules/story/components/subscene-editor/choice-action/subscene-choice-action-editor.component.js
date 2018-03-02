angular
	.module("story")
	.component("subsceneChoiceActionEditor", {		
		templateUrl: "modules/story/components/subscene-editor/choice-action/subscene-choice-action-editor.html",
		bindings: {
			choiceAction: "="
		},
		controller: ["StoryEditorService", "config", function(StoryEditorService, config){
			var ctrl = this;
			ctrl.feedbackOptions = config.content.feedback;
			ctrl.feedbackMin = config.constraints.feedback.min;
			ctrl.feedbackMax = config.constraints.feedback.max
		}]


	});