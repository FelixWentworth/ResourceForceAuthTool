angular
	.module("story")
	.component("storyMetadataBrowser", {
		templateUrl: "/modules/story/components/metadata-browser/story-metadata-browser.html",
		bindings: {
			storiesMetadata: "=",
			creatorId: "=",
			memberType: "=",
			reviewing: "<",
			viewDeleted: "<",
			managing: "<",
			canDisable: "<",
			onChange: "&"
		},
		controller: ["StoryStorageService", "config", function (StoryStorageService, config) {
			var ctrl = this;
			ctrl.commentMin = config.constraints.comment.min;
			ctrl.commentMax = config.constraints.comment.max;

			ctrl.submit = function(metadata){
				metadata.submitted = true;
				metadata.isValid = false; // has been changed, so needs validating again
				StoryStorageService.updateMetadata(metadata);
				ctrl.onChange();
			};

			ctrl.duplicate = function(id){
				StoryStorageService.duplicateStory(id)
					.then(function(newStory){
						ctrl.storiesMetadata.push(newStory.metadata);
					}
				);
				ctrl.onChange();
			};
			
			ctrl.validate = function(metadata, valid){
				if (metadata.comment == null || metadata.comment.length == 0 || metadata.comment.length > 200)
				{
					return;
				}
				metadata.isValid = valid;
				metadata.submitted = false;
				StoryStorageService.updateMetadata(metadata);
				ctrl.onChange();
			};

			ctrl.setEnabled = function(metadata){
				metadata.enabled = true;
				StoryStorageService.updateMetadata(metadata);
				ctrl.onChange();
			}

			ctrl.setDisabled = function(metadata){
				metadata.enabled = false;
				StoryStorageService.updateMetadata(metadata);
				ctrl.onChange();				
			}

			ctrl.delete = function(metadata){
				metadata.deleted = true;
				metadata.isValid = false;
				metadata.submitted = false;
				StoryStorageService.updateMetadata(metadata);
				ctrl.onChange();
			};
			ctrl.restore = function(metadata){
				metadata.deleted = false;
				metadata.isValid = false;
				metadata.submitted = false;
				StoryStorageService.updateMetadata(metadata);
				ctrl.onChange();
			};
		}]
	});	