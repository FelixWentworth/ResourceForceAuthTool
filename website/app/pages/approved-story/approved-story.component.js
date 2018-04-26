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

        ctrl.userAllowedLocations = ctrl.isLoggedIn ? Auth.getAllowedLocations() : "";
        
        ctrl.isAdmin = ctrl.memberType == 'admin';
        ctrl.isValidator = ctrl.memberType == 'validator';
        ctrl.isMember = ctrl.memberType == 'member';

        var requestsPromise = null;
        ctrl.status = "";

        ctrl.allowedLocations = {Loading : ["Loading"]};

        ctrl.$onInit = function() {
            if (!ctrl.isLoggedIn)
            {
                $state.go('home');
            }
            this.refresh();

            if (ctrl.userAllowedLocations != null && ctrl.userAllowedLocations != "")
            {
                ctrl.allowedLocations = JSON.parse(ctrl.userAllowedLocations);   
            }
            else
            {
                ctrl.allowedLocations = {None : ["None"]};   
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