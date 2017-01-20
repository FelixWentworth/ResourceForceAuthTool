angular
	.module('storyGameMaker')
	.directive("sceneNode", function(){
		return {
			restrict: 'E',
			scope: {
				scene: "="
			},
			templateUrl: "app/story/tree/scene/scene-node.html",
		};
	});