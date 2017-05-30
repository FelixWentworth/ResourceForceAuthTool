angular
	.module("story")
	.component("subsceneChoiceActionEditor", {		
		templateUrl: "modules/story/components/subscene-editor/choice-action/subscene-choice-action-editor.html",
		bindings: {
			choiceAction: "="
		},
		controller: ["StoryEditorService", function(StoryEditorService){
			var ctrl = this;
			ctrl.feedbackOptions = [1,2,3,4,5];
		}]


	});