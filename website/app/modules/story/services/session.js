'use strict';

angular.module('resourceForceAuthoringTool')
.service('Session', function () {
  this.create = function (userId, userName, type, allowedLocations) {
    this.userId = userId;
    this.userName = userName;
    this.userType = type;
    this.userAllowedLocations = allowedLocations;
  };
  this.destroy = function () {
    this.userId = null;
    this.userName = null;
    this.userType = null;
    this.userAllowedLocations = null;    
  };
})