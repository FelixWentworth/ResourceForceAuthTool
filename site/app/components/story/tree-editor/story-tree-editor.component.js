angular
	.module("storyGameMaker")
	.component("storyTreeEditor", {		
		templateUrl: "app/components/story/tree-editor/story-tree-editor.html",
		bindings: {
			story: "<"
		},
		controller: ["StoryService", function (StoryService) {
			var ctrl = this;

			ctrl.apply = function(isValid) {
				if(isValid) {
					StoryService.save(ctrl.story);
				} else {
					alert("There seems to be an invalid part of your story." + 
						" \nYou must find it and fix it in order to save." +
						" \nIt should be hilighted to help you identify it.");
				}
			};

			ctrl.$onInit = function () {
				// make a copy so the original in memory reference isn't affected
				ctrl.story = angular.copy(ctrl.story);
			}
		}]
	});