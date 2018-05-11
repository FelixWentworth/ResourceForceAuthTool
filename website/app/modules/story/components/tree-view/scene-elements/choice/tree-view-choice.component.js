angular
	.module("story")
	.component("treeViewChoice", {		
		templateUrl: "/modules/story/components/tree-view/scene-elements/choice/tree-view-choice.html",
		bindings: {
			choice: "<"
		},
		controller: ["config", function(config) {
			var ctrl = this;
			ctrl.$onInit = function() {
				ctrl.choice.scene.severity = config.content.severity.find(s => s.id == ctrl.choice.scene.severity).name;
				
				if (ctrl.choice.scene.satisfactionImpact >= -5 && ctrl.choice.scene.satisfactionImpact <= 5)
				{
					ctrl.choice.scene.satisfactionImpact = config.content.impact.find(s => s.id == ctrl.choice.scene.satisfactionImpact).name;					
				}
				else
				{
					ctrl.choice.scene.satisfactionImpact = "None";					
				}
				
				ctrl.choice.choice.feedbackRating = config.content.feedback.find(s => s.id == ctrl.choice.choice.feedbackRating).name;
			}
	}]
});