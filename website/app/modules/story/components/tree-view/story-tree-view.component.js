angular
	.module("story")
	.component("storyTreeView", {		
		templateUrl: "/modules/story/components/tree-view/story-tree-view.html",
		bindings: {
			story: "<"
		},
		controller: ["config", function(config) {
			var ctrl = this;
			ctrl.$onInit = function() {
				ctrl.story.content.scene.severity = config.content.severity.find(s => s.id == ctrl.story.content.scene.severity).name;
				ctrl.story.content.scene.satisfactionImpact = config.content.impact.find(s => s.id == ctrl.story.content.scene.satisfactionImpact).name;
			}
	}]	
});