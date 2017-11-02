'use strict';

angular.module('resourceForceAuthoringTool')
.service('Session', function () {
  this.create = function (userId, userName, type, languages, locations) {
    this.userId = userId;
    this.userName = userName;
    this.userType = type;
    this.userLanguages = languages;
    this.userLocations = locations;
  };
  this.destroy = function () {
    this.userId = null;
    this.userName = null;
    this.userType = type;
    this.userLanguages = null;
    this.userLocations = null;    
  };
})