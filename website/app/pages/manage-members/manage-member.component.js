angular
.module("resourceForceAuthoringTool")
.component("manageMember", {
    templateUrl: "/pages/manage-members/manage-member.html",
    controller: ["StoryStorageService", "$http", "Auth", "$q", "$state", "config", function(StoryStorageService, $http, Auth, $q, $state, config) {
        var ctrl = this;

        ctrl.title = "Manage Account";

        ctrl.isLoggedIn = Auth.isLoggedIn();
        ctrl.creatorId = ctrl.isLoggedIn ? Auth.getId() : 0;
        ctrl.memberType = ctrl.isLoggedIn ? Auth.getType() : "";
        ctrl.username = ctrl.isLoggedIn ? Auth.getName() : "";

        ctrl.userValidationRegions = ctrl.isLoggedIn ? Auth.getValidationRegions() : "";
        ctrl.userContentRegions = ctrl.isLoggedIn ? Auth.getContentRegions() : "";

        ctrl.isAdmin = ctrl.memberType == 'admin';
        ctrl.isValidator = ctrl.memberType == 'validator';
        ctrl.isMember = ctrl.memberType == 'member';

        ctrl.regions = [];

        ctrl.reasonMin = config.constraints.reason.min;
        ctrl.reasonMax = config.constraints.reason.max;
        
        ctrl.response = "";

        var requestsPromise = null;

        ctrl.$onInit = function() {
            if (!ctrl.isLoggedIn)
            {
                $state.go('home');
            }
            this.refresh();
        }

        ctrl.$postLink = function() {
            if (ctrl.isLoggedIn && Auth.getType() == 'admin')
            {
                ctrl.regions = Object.keys(config.content.regions);
            }
            else
            {
                if (ctrl.userContentRegions != null && ctrl.userContentRegions != "" && ctrl.userValidationRegions != null && ctrl.userValidationRegions != "")
                {
                    var contentRegions = JSON.parse(ctrl.userContentRegions);
                    var validationRegions = JSON.parse(ctrl.userValidationRegions);
                    for (var region in contentRegions)
                    {
                        if (!validationRegions.includes(contentRegions[region]))
                        {
                            ctrl.regions.push(contentRegions[region]);
                        }
                    } 
                    if (ctrl.request != null && ctrl.request.metadata != null && ctrl.regions.length == 1) {
                        ctrl.request.metadata.region = ctrl.regions[0];
                    }
                }
            }
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
                // Load all requests made for language and region current validator has access to   
                StoryStorageService.getValidatorRequests(ctrl.userValidationRegions)
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