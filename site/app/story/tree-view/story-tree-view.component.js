angular
	.module('storyGameMaker')
	.component('storyTreeView', {		
		templateUrl: "app/story/tree-view/story-tree-view.html",
		controller: function($scope, $http){		
			$http.get("app/story/demo/story-demo.json")
			.then(function(story){
				$scope.story = story.data;
			});
		}
	});