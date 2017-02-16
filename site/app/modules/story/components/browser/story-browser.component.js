angular
	.module("story")
	.component("storyBrowser", {
		templateUrl: "modules/story/components/browser/story-browser.html",
		bindings: {
			stories: "<"
		}
	});