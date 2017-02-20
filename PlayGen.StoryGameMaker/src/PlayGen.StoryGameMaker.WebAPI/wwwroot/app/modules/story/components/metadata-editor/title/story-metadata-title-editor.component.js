angular
	.module("story")
	.component("storyMetadataTitleEditor", {		
		templateUrl: "modules/story/components/metadata-editor/title/story-metadata-title-editor.html",
		bindings: {
			title: "="
		},
		controller: function() {
			var ctrl = this;		

			ctrl.editMode = false;

			// todo make data driven
			ctrl.placeholder = "story title placeholder";
			ctrl.minlength = 5;

			ctrl.enterEditMode = function () {
				ctrl.editMode = true;
				console.log("ENTER");
			};

			ctrl.exitEditMode = function () {
				ctrl.editMode = false;
				console.log("EXIT");
			};
		}
	});