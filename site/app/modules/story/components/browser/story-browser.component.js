angular
	.module("story")
	.component("storyBrowser", {
		templateUrl: "app/modules/story/components/browser/story-browser.html",
		bindings: {
			stories: "<"
		}
	});