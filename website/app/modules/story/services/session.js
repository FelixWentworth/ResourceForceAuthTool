'use strict';

angular.module('resourceForceAuthoringTool')
.service('Session', function () {
  this.create = function (userId, userName, type, contentRegions, validationRegions) {
    this.userId = userId;
    this.userName = userName;
    this.userType = type;
    this.contentRegions = contentRegions;
    this.validationRegions = validationRegions;
  };
  this.destroy = function () {
    this.userId = null;
    this.userName = null;
    this.userType = null;
    this.contentRegions = null;
    this.validationRegions = null;    
  };
})