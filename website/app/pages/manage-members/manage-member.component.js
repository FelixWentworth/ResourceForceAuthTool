angular
.module("resourceForceAuthoringTool")
.component("manageMember", {
    templateUrl: "pages/manage-members/manage-member.html",
    controller: ["StoryStorageService", "$http", "Auth", "$q", "$state", function(StoryStorageService, $http, Auth, $q, $state) {
        var ctrl = this;

        ctrl.title = "Manage Account";

        ctrl.isLoggedIn = Auth.isLoggedIn();
        ctrl.creatorId = ctrl.isLoggedIn ? Auth.getId() : 0;
        ctrl.memberType = ctrl.isLoggedIn ? Auth.getType() : "";
        ctrl.username = ctrl.isLoggedIn ? Auth.getName() : "";

        ctrl.userLanguages = ctrl.isLoggedIn ? Auth.getLanguages() : "";
        ctrl.userLocations = ctrl.isLoggedIn ? Auth.getLocations() : "";
        

        ctrl.isAdmin = ctrl.memberType == 'admin';
        ctrl.isValidator = ctrl.memberType == 'validator';
        ctrl.isMember = ctrl.memberType == 'member';

        ctrl.locations = ["Belfast", "Groningen", "Preston", "Nicosia", "Valencia"];
        ctrl.languages = ["Dutch", "English", "Greek", "Spanish"];
        
        ctrl.response = "";

        var requestsPromise = null;

        ctrl.$onInit = function() {
            if (!ctrl.isLoggedIn)
            {
                $state.go('home');
            }
            this.refresh();
        }

        ctrl.submit = function(request)
        {
            ctrl.response = "Sending";
            request.metadata.playerId = ctrl.creatorId;
            request.metadata.memberType = 'validator';
            StoryStorageService.submitValidatorRequest(request).then(function(){
                ctrl.response = "Application Sent";
            }).catch(function(){
                ctrl.response = "Application failed to send";
            });
        }

        ctrl.refresh = function()
        {
            if (ctrl.isAdmin)
            {
                // Load all requests made
                StoryStorageService.getValidatorRequestsForAdmin()
                .then(function(response){
                {
                    ctrl.requests = response;
                }	
                }).catch(function(error)
                {
                    ctrl.response = error.statusText + ". " + error.Message;
                });
            }
            else if (ctrl.isValidator)
            {
                // Load all requests made for language and location current validator has access to   
                StoryStorageService.getValidatorRequests(ctrl.userLocations, ctrl.userLanguages)
                .then(function(response){
                {
                    ctrl.requests = response;
                }	
                }).catch(function(error)
                {
                    ctrl.response = error.statusText + ". " + error.Message;
                });
            }
        }

        ctrl.approve = function(request)
        {
            StoryStorageService.approveRequest(request).then(function(){
                ctrl.refresh();
            }).catch(function (){
                console.log("[Error] Failed to send request");
                ctrl.refresh();
            });
        }
        ctrl.reject = function(request)
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