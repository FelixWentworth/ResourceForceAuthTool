angular
	.module("story")
	.component("storyMetadataBrowser", {
		templateUrl: "modules/story/components/metadata-browser/story-metadata-browser.html",
		bindings: {
			storiesMetadata: "=",
			creatorId: "=",
			memberType: "=",
			reviewing: "<",
			viewDeleted: "<"
		},
		controller: ["StoryStorageService", function (StoryStorageService) {
			var ctrl = this;
			ctrl.comment = "";

			ctrl.submit = function(metadata){
				metadata.submitted = true;
				metadata.isValid = false; // has been changed, so needs validating again
				StoryStorageService.updateMetadata(metadata);
			};

			ctrl.duplicate = function(id){
				StoryStorageService.duplicateStory(id)
					.then(function(newStory){
						ctrl.storiesMetadata.push(newStory.metadata);
					}
				);
			};
			
			ctrl.validate = function(metadata, valid){
				if (ctrl.comment == null || ctrl.comment.length == 0 || ctrl.comment.length > 200)
				{
					return;
				}
				metadata.isValid = valid;
				metadata.submitted = false;
				metadata.comment = ctrl.comment;
				StoryStorageService.updateMetadata(metadata);
			};

			ctrl.delete = function(metadata){
				metadata.deleted = true;
				metadata.isValid = false;
				metadata.submitted = true;
				metadata.comment = ctrl.comment;				
				StoryStorageService.updateMetadata(metadata);
			};
			ctrl.restore = function(metadata){
				metadata.deleted = false;
				metadata.comment = ctrl.comment;				
				StoryStorageService.updateMetadata(metadata);
			};
		}]
	});	