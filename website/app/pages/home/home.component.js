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
		templateUrl: "pages/home/home.html",
		controller: ["StoryStorageService", "$http", "Auth", function(StoryStorageService, $http, Auth) {
			var ctrl = this;
			
			ctrl.loader = new StoriesMetadataLoader(StoryStorageService);
			
			ctrl.isLoggedIn = Auth.isLoggedIn();
			ctrl.creatorId = ctrl.isLoggedIn ? Auth.getId() : 0;
			ctrl.memberType = ctrl.isLoggedIn ? Auth.getType() : "";
			ctrl.username = ctrl.isLoggedIn ? Auth.getName() : "";

			ctrl.error = "";

			if (ctrl.isLoggedIn)
			{
				ctrl.loader.load(ctrl.creatorId);
			}

			ctrl.Login = function(user) {
				// TODO send login request

				$http.post('../api' + '/user/login', user)
					.then(function(response){
						if (response.status === 200)
						{
							ctrl.isLoggedIn = true;
							ctrl.username = response.data.username;
							ctrl.creatorId = response.data.id;
							ctrl.memberType = response.data.memberType;

							ctrl.loader.load(ctrl.creatorId);
							Auth.set(ctrl.creatorId, ctrl.username, ctrl.memberType);
						}	
					})
					.catch(function(error)
					{
						ctrl.error = error.statusText + ". " + error.Message;
					});

			};

			ctrl.Create = function(user) {
				// TODO send login request
				user.memberType = 'member'
				$http.post('../api' + '/user', user)
					.then(function(response){
						if (response.status === 200)
						{
							ctrl.isLoggedIn = true;
							ctrl.username = response.data.metadata.username;
							ctrl.creatorId =  response.data.id;
							ctrl.memberType = response.data.memberType;

							ctrl.loader.load(ctrl.creatorId);
							Auth.set(ctrl.creatorId, ctrl.username, ctrl.memberType);
						}		
					})
					.catch(function(error)
					{
						ctrl.error = error.statusText + ". " + error.Message;
					});
			};

			ctrl.GuestLogin = function() {
				ctrl.isLoggedIn = true;
				ctrl.username = "Guest";
			}

			ctrl.Logout = function() {
				ctrl.isLoggedIn = false;
				ctrl.username = "";
				Auth.logout();
			}
		}]
	});