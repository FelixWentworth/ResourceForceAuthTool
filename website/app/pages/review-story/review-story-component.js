angular
.module("resourceForceAuthoringTool")
.component("reviewStory", {
    templateUrl: "pages/review-story/review-story.html",
    controller: ["StoryStorageService", "$state", "Auth", function(StoryStorageService, $state, Auth) {
        var ctrl = this;

        ctrl.title = "Review Submitted Content";

        ctrl.loader = new StoriesMetadataLoader(StoryStorageService);

        ctrl.isLoggedIn = Auth.isLoggedIn();
        ctrl.creatorId = ctrl.isLoggedIn ? Auth.getId() : 0;
        ctrl.memberType = ctrl.isLoggedIn ? Auth.getType() : "";
        ctrl.username = ctrl.isLoggedIn ? Auth.getName() : "";
        
        ctrl.$onInit = function() {
            if (!ctrl.isLoggedIn)
            {
                $state.go('home');
            }
            else{
                ctrl.loader.loadForValidation(ctrl.creatorId);
            }
        }

        ctrl.refresh = function() {
            ctrl.loader.loadForValidation(ctrl.creatorId);				
        }

        ctrl.Logout = function() {
            ctrl.isLoggedIn = false;
            ctrl.username = "";
            Auth.logout();
            $state.go("home");
        }
    }]
});