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
			ctrl.userAllowedLocations = ctrl.isLoggedIn ? Auth.getAllowedLocations() : "";

			ctrl.metadataHelp = {
				"title": "",
				"location": "",
				"language": "",				
			};

			ctrl.allowedLocations = {};
			ctrl.locations = [];
			ctrl.languages = ctrl.metadata.location != null ? ctrl.allowedLocations[ctrl.metadata.location] : [];
			
			ctrl.titleMin = config.constraints.title.min;
			ctrl.titleMax = config.constraints.title.max;

			ctrl.$postLink = function() {
				if (ctrl.userAllowedLocations != null && ctrl.userAllowedLocations != "")
                {
					ctrl.allowedLocations = JSON.parse(ctrl.userAllowedLocations);
					ctrl.locations = Object.keys(ctrl.allowedLocations)
					if (ctrl.locations.length == 1) {
						ctrl.metadata.location = ctrl.locations[0];
					}
                }
			}

			ctrl.changeLocation = function() {
				ctrl.languages = ctrl.allowedLocations[ctrl.metadata.location];
				if (ctrl.languages.length == 1) {
					ctrl.metadata.language = ctrl.languages[0];
				}
			}
		}]
	});