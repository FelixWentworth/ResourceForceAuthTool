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
		controller: ["StoryStorageService", "$http", "$state", "Auth", "config", function(StoryStorageService, $http, $state, Auth, config) {
			var ctrl = this;
			
			ctrl.title = "Resource Force Authoring Tool";

			ctrl.loader = new StoriesMetadataLoader(StoryStorageService);
			
			ctrl.isLoggedIn = Auth.isLoggedIn();
			ctrl.creatorId = ctrl.isLoggedIn ? Auth.getId() : 0;
			ctrl.memberType = ctrl.isLoggedIn ? Auth.getType() : "";
			ctrl.username = ctrl.isLoggedIn ? Auth.getName() : "";

			ctrl.createAccount = false;
			ctrl.regions = Object.keys(config.content.regions);

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
				if (user == null || user.metadata == null || user.metadata.username == null || user.metadata.password == null)
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
							ctrl.contentRegions = response.data.contentRegions;
							ctrl.validationRegions = response.data.validationRegions;

							ctrl.loader.load(ctrl.creatorId);
							Auth.set(ctrl.creatorId, ctrl.username, ctrl.memberType, ctrl.contentRegions, ctrl.validationRegions);
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
				if (user == null || user.metadata == null || user.metadata.username == null || user.metadata.username.length < 5)
				{
					ctrl.error = "Username must be at least five characters";	
				}
				else if (user.metadata.password == null || user.metadata.password.length < 5)
				{
					ctrl.error = "Password must be at least five characters";	
				}
				else if (user.metadata.password != user.metadata.passwordconfirm) 
				{
					ctrl.error = "Provided passwords do not match";	
				}
				else
				{
					user.metadata.memberType = 'member';
					$http.post('../api' + '/user', user)
						.then(function(response){
							if (response.status === 200)
							{
								ctrl.request.metadata.playerId = response.data.metadata.id;
								ctrl.request.metadata.username = response.data.metadata.username;
								ctrl.request.metadata.memberType = 'member';
								$http.post('../api' + '/accountrequest', ctrl.request)
									.then(function(){
										ctrl.createAccount = false;
										ctrl.Login(user);
									}).catch(function(){
									});
							}		
						})
						.catch(function(error)
						{
							ctrl.error = error.statusText + ". " + error.data;
						});
				}
			};

			ctrl.showCreateAccount = function(show) {
				ctrl.createAccount = show;
			}

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