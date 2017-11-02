angular
.module("resourceForceAuthoringTool")
.component("manageMember", {
    templateUrl: "pages/manage-members/manage-member.html",
    controller: ["StoryStorageService", "$http", "Auth", "$q", function(StoryStorageService, $http, Auth, $q) {
        var ctrl = this;

        ctrl.isLoggedIn = Auth.isLoggedIn();
        ctrl.creatorId = ctrl.isLoggedIn ? Auth.getId() : 0;
        ctrl.memberType = ctrl.isLoggedIn ? Auth.getType() : "";
        ctrl.username = ctrl.isLoggedIn ? Auth.getName() : "";

        ctrl.isAdmin = ctrl.memberType == 'admin';
        ctrl.isValidator = ctrl.memberType == 'validator';
        ctrl.isMember = ctrl.memberType == 'member';

        ctrl.locations = ["Belfast", "Groningen", "Preston", "Nicosia", "Valencia"];
        ctrl.languages = ["Dutch", "English", "Greek", "Spanish"];

        var requestsPromise = null;

        ctrl.$onInit = function() {
            this.refresh();
        }

        ctrl.submit = function(request)
        {
            request.metadata.playerId = ctrl.creatorId;
            request.metadata.memberType = 'validator';
            StoryStorageService.submitValidatorRequest(request);
        }

        ctrl.refresh = function()
        {
            if (ctrl.isAdmin)
            {
                // Load all requests made
                StoryStorageService.getValidatorRequests()
                .then(function(response){
                {
                    ctrl.requests = response;
                }	
                }).catch(function(error)
                {
                    ctrl.error = error.statusText + ". " + error.Message;
                });
            }
            else if (ctrl.isValidator)
            {
                // Load all requests made for language and location current validator has access to   
            }
        }

        ctrl.approve = function(request)
        {
            StoryStorageService.approveRequest(request).then(function(){
                refresh();
            });
        }
        ctrl.reject = function(request)
        {
            StoryStorageService.rejectRequest(request).then(function(){
                refresh();
            });
        }
    }]
});