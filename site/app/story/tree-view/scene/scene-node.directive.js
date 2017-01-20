angular
	.module('storyGameMaker')
	.directive("sceneNode", function(){
		return {
			restrict: 'E',
			scope: {
				scene: "="
			},
			templateUrl: "app/story/tree-view/scene/scene-node.html",
		};
	});