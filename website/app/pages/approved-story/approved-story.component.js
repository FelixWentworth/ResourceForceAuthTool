angular
.module("resourceForceAuthoringTool")
.component("approvedStory", {
    templateUrl: "/pages/approved-story/approved-story.html",
    controller: ["StoryStorageService", "$http", "Auth", "$q", "$state", "config", function(StoryStorageService, $http, Auth, $q, $state, config) {
        var ctrl = this;

        ctrl.title = "Content currently in game";

        ctrl.loader = new StoriesMetadataLoader(StoryStorageService);

        ctrl.isLoggedIn = Auth.isLoggedIn();
        ctrl.creatorId = ctrl.isLoggedIn ? Auth.getId() : 0;
        ctrl.memberType = ctrl.isLoggedIn ? Auth.getType() : "";
        ctrl.username = ctrl.isLoggedIn ? Auth.getName() : "";

        ctrl.userRegions = ctrl.isLoggedIn ? Auth.getContentRegions() : "";
        ctrl.regions = [];
        ctrl.languages = [];
        
        ctrl.isAdmin = ctrl.memberType == 'admin';
        ctrl.isValidator = ctrl.memberType == 'validator';
        ctrl.isMember = ctrl.memberType == 'member';

        ctrl.minimumActiveScenarios = config.constraints.minScenarios;  

        var requestsPromise = null;
        ctrl.status = "";

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
                if (ctrl.userRegions != null && ctrl.userRegions != "")
                {
                    if (ctrl.regions.length == 1) {
                        ctrl.selected.region = ctrl.regions[0];
                    }
                }
            }
        }

        ctrl.changeRegion = function() {
            if (ctrl.selected == null || ctrl.selected.region == "")
            {
                // Not selected a region
                return;
            }
            ctrl.languages = config.content.regions[ctrl.selected.region];
            if (!ctrl.languages.includes(ctrl.selected.language))
            {
                ctrl.selected.language = "";
            }
            if (ctrl.languages.length == 1) {
                ctrl.selected.language = ctrl.languages[0];
            }
        }

        ctrl.load = function(filter)
        {
            ctrl.status = "Loading..."
            ctrl.loader.loadExisting(filter.language, filter.region, onLoaded);
        }

        function onLoaded(storiesMetadata) {
            ctrl.inGameStories = storiesMetadata.filter(storyMetadata => storyMetadata.enabled);
            ctrl.inactiveStories = storiesMetadata.filter(storyMetadata => !storyMetadata.enabled);
        }

        ctrl.refreshStories = function() {
            var allStories = [];
            allStories = ctrl.inGameStories.concat(ctrl.inactiveStories);
            ctrl.inGameStories = allStories.filter(storyMetadata => storyMetadata.enabled);
            ctrl.inactiveStories = allStories.filter(storyMetadata => !storyMetadata.enabled);
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

        ctrl.canDisable = function()
        {
            var allStories = [];
            allStories = ctrl.inGameStories.concat(ctrl.inactiveStories);
            return allStories.filter(storyMetadata => storyMetadata.enabled).length > ctrl.minimumActiveScenarios;
            
        }
    }]
});