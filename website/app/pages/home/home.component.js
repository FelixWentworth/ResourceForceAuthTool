angular
	.module("storyGameMaker")
	.component("home", {
		templateUrl: "pages/home/home.html",
		controller: ["StoryStorageService", "$http", function(StoryStorageService, $http) {
			var ctrl = this;
			
			ctrl.loader = new StoriesMetadataLoader(StoryStorageService);
			
			ctrl.isLoggedIn = false;
			ctrl.usernmae = "";

			ctrl.error = "";

			ctrl.Login = function(user) {
				// TODO send login request

				$http.post('../api' + '/user/login', user)
					.then(function(response){
						if (response.status === 200)
						{
							ctrl.isLoggedIn = true;
							ctrl.username = response.data.username;
							
							ctrl.loader.load(response.data.id);
						}	
					})
					.catch(function(error)
					{
						ctrl.error = error.statusText + ". " + error.Message;
					});

			};

			ctrl.Create = function(user) {
				// TODO send login request

				$http.post('../api' + '/user', user)
					.then(function(response){
						if (response.status === 200)
						{
							ctrl.isLoggedIn = true;
							ctrl.username = response.data.metadata.username;
						
							ctrl.loader.load(response.data.id);
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
			}
		}]
	});