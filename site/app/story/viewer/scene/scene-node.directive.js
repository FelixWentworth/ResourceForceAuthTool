angular
	.module('storyGameMaker')
	.directive("sceneNode", function(){
		return {
			restrict: 'E',
			scope: {
				scene: "="
			},
			templateUrl: "app/story/viewer/scene/scene-node.html",
		};
	});