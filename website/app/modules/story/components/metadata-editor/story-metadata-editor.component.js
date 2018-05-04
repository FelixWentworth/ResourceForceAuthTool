angular
	.module("story")
	.component("storyMetadataEditor", {		
		templateUrl: "/modules/story/components/metadata-editor/story-metadata-editor.html",
		bindings: {
			metadata: "="
		},
		controller: [ "config", "$http", "Auth", "$q", function(config, $http, Auth, $q) {
			var ctrl = this;

			ctrl.isLoggedIn = Auth.isLoggedIn();
			ctrl.userRegions = ctrl.isLoggedIn ? Auth.getContentRegions() : "";
			
			ctrl.regions = [];
			ctrl.languages = [];

			ctrl.metadataHelp = {
				"title": "",
				"region": "",
				"language": "",				
			};
			
			ctrl.titleMin = config.constraints.title.min;
			ctrl.titleMax = config.constraints.title.max;

			ctrl.$postLink = function() {
				if (ctrl.isLoggedIn && (Auth.getType() == 'admin' || Auth.getType() == 'guest'))
				{
					ctrl.regions = Object.keys(config.content.regions);
				}
				else
				{
					if (ctrl.userRegions != null && ctrl.userRegions != "")
					{
						ctrl.regions = JSON.parse(ctrl.userRegions);
						if (ctrl.regions.length == 1) {
							ctrl.metadata.region = ctrl.regions[0];
						}
					}
				}
			}

			ctrl.changeRegion = function() {
				if (ctrl.metadata == null || ctrl.metadata.region == "")
				{
					// Not selected a region
					return;
				}
				ctrl.languages = config.content.regions[ctrl.metadata.region];
				if (!ctrl.languages.includes(ctrl.metadata.language))
				{
					ctrl.metadata.language = "";
				}
				if (ctrl.languages.length == 1) {
					ctrl.metadata.language = ctrl.languages[0];
				}
			}
		}]
	});