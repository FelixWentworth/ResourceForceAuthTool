angular
	.module("resourceForceAuthoringTool")
	.directive('ngEnter', function () {
		return function (scope, element, attrs) {
			element.bind("keydown keypress", function (event) {
				if(event.which === 13) {
					scope.$apply(function (){
						scope.$eval(attrs.ngEnter);
					});
	 
					event.preventDefault();
				}
			});
		};
	})
	.component("home", {
		templateUrl: "/pages/home/home.html",
		controller: ["StoryStorageService", "$http", "$state", "Auth", function(StoryStorageService, $http, $state, Auth) {
			var ctrl = this;
			
			ctrl.title = "Resource Force Authoring Tool";

			ctrl.loader = new StoriesMetadataLoader(StoryStorageService);
			
			ctrl.isLoggedIn = Auth.isLoggedIn();
			ctrl.creatorId = ctrl.isLoggedIn ? Auth.getId() : 0;
			ctrl.memberType = ctrl.isLoggedIn ? Auth.getType() : "";
			ctrl.username = ctrl.isLoggedIn ? Auth.getName() : "";

			ctrl.error = "";
			ctrl.viewDeleted = "View Deleted Content";
			ctrl.showDeleted = false;

			if (ctrl.isLoggedIn)
			{
				ctrl.loader.load(ctrl.creatorId);
				ctrl.loader.loadForValidation(ctrl.creatorId);
			}

			ctrl.Login = function(user) {
				// TODO send login request
				if (user == null || user.Metadata == null || user.Metadata.username == null || user.Metadata.password == null)
				{
					ctrl.error = "Please provide a username and password.";	
				}
				else
				{
				$http.post('../api' + '/user/login', user)
					.then(function(response){
						if (response.status === 200)
						{
							ctrl.isLoggedIn = true;
							ctrl.username = response.data.username;
							ctrl.creatorId = response.data.id;
							ctrl.memberType = response.data.memberType;
							ctrl.allowedLocations = response.data.allowedLocations;

							ctrl.loader.load(ctrl.creatorId);
							Auth.set(ctrl.creatorId, ctrl.username, ctrl.memberType, ctrl.allowedLocations);
						}	
					})
					.catch(function(error)
					{
						ctrl.error = error.statusText + ". " + error.data;
					});
				}
			};

			ctrl.Create = function(user) {
				// TODO send login request
				if (user == null || user.Metadata == null || user.Metadata.username == null || user.Metadata.username.length < 5)
				{
					ctrl.error = "Username must be at least five characters";	
				}
				else if (user.Metadata.password == null || user.Metadata.password.length < 5)
				{
					ctrl.error = "Password must be at least five characters";	
				}
				else
				{
					user.memberType = 'member';
					$http.post('../api' + '/user', user)
						.then(function(response){
							if (response.status === 200)
							{
								ctrl.Login(user);
							}		
						})
						.catch(function(error)
						{
							ctrl.error = error.statusText + ". " + error.data;
						});
				}
			};

			ctrl.GuestLogin = function() {
				ctrl.isLoggedIn = true;
				ctrl.username = "guest";
				ctrl.memberType = "guest";
				Auth.set("0", "Guest", "guest", "[]", "[]");
			}

			ctrl.ToggleDeleted = function(){
				ctrl.showDeleted = !ctrl.showDeleted;
				if (ctrl.showDeleted)
				{
					ctrl.viewDeleted = "Hide Deleted Content";
				}
				else
				{
					ctrl.viewDeleted = "View Deleted Content";
				}
				
			}
		}]
	});