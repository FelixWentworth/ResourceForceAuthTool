'use strict';

angular.module('resourceForceAuthoringTool')
.service('Session', function () {
  this.create = function (userId, userName, type) {
    this.userId = userId;
    this.userName = userName;
    this.userType = type;
  };
  this.destroy = function () {
    this.userId = null;
    this.userName = null;
    this.userType = type;
  };
})