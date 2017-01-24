angular
	.module('storyGameMaker')
	.component('storyBrowser', {
		templateUrl: "app/components/story/browser/story-browser.html",
		bindings: {
			stories: '<'
		}
	});