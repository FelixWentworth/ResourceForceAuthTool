angular
.module("resourceForceAuthoringTool")
.component("approvedStory", {
    templateUrl: "pages/approved-story/approved-story.html",
    controller: ["StoryStorageService", "$http", "Auth", "$q", "$state", function(StoryStorageService, $http, Auth, $q, $state) {
        var ctrl = this;

        ctrl.title = "Content currently in game";

        ctrl.loader = new StoriesMetadataLoader(StoryStorageService);

        ctrl.isLoggedIn = Auth.isLoggedIn();
        ctrl.creatorId = ctrl.isLoggedIn ? Auth.getId() : 0;
        ctrl.memberType = ctrl.isLoggedIn ? Auth.getType() : "";
        ctrl.username = ctrl.isLoggedIn ? Auth.getName() : "";

        ctrl.userLanguages = ctrl.isLoggedIn ? Auth.getLanguages() : "";
        ctrl.userLocations = ctrl.isLoggedIn ? Auth.getLocations() : "";
        
        ctrl.isAdmin = ctrl.memberType == 'admin';
        ctrl.isValidator = ctrl.memberType == 'validator';
        ctrl.isMember = ctrl.memberType == 'member';

        var requestsPromise = null;
        ctrl.status = "";

        ctrl.locations = ["Loading"];
        ctrl.languages = ["Loading"];

        ctrl.$onInit = function() {
            if (!ctrl.isLoggedIn)
            {
                $state.go('home');
            }
            this.refresh();

            if (ctrl.userLanguages != null && ctrl.userLanguages != "")
            {
                ctrl.languages = JSON.parse(ctrl.userLanguages);   
            }
            else
            {
                ctrl.languages = ["None Available"];   
            }
            if (ctrl.userLocations != null && ctrl.userLocations != "")
            {
                ctrl.locations = JSON.parse(ctrl.userLocations);   
            }
            else
            {
                ctrl.locations = ["None Available"];                   
            }
        }

        ctrl.load = function(filter)
        {
            ctrl.status = "Loading..."
            ctrl.loader.loadExisting(filter.language, filter.location);

        }

        ctrl.refresh = function()
        {
            
        }

        ctrl.delete = function(request)
        {
            StoryStorageService.rejectRequest(request).then(function(){
                ctrl.refresh();
            }).catch(function (){
                console.log("[Error] Failed to send request");
                ctrl.refresh();
            });
        }
    }]
});