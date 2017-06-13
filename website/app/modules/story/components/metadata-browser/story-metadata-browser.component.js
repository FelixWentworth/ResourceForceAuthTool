angular
	.module("story")
	.component("storyMetadataBrowser", {
		templateUrl: "modules/story/components/metadata-browser/story-metadata-browser.html",
		bindings: {
			storiesMetadata: "=",
			creatorId: "=",
			memberType: "=",
		},
		controller: ["StoryStorageService", function (StoryStorageService) {
			var ctrl = this;

			ctrl.submit = function(metadata){
				metadata.submitted = true;
				StoryStorageService.updateMetadata(metadata);
			};
			
			ctrl.validate = function(metadata, valid){
				metadata.isValid = valid;
				metadata.submitted = false;
				StoryStorageService.updateMetadata(metadata);
			};

			ctrl.delete = function(metadata){
				metadata.deleted = true;
				StoryStorageService.updateMetadata(metadata);
			};
		}]
	});	