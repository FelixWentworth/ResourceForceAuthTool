'use strict';

/**
 * @ngdoc service
 * @name ResourceForceAuthoringTool.Auth
 * @description
 * # Auth
 * Service in the ResourceForceAuthoringTool.
 */
angular.module('resourceForceAuthoringTool').factory('AuthService', ["$http", "Session", function ($http, Session) {
  var authService = {};
 
  authService.login = function (id, name, type, contentRegions, validationRegions) {
    Session.create( id, name, type, contentRegions, validationRegions);
  };
 
  authService.loginWithCookies = function (cookies){
    Session.create(cookies["id"], cookies["name"], cookies["type"], cookies["contentRegions"], cookies["validationRegions"])
  };    

  authService.isAuthenticated = function () {
    return !!Session.userId;
  };

  authService.getUsername = function () {
    return Session.userName;
  };

  authService.getId = function () {
    return Session.userId;
  };

  authService.getType = function () {
    return Session.userType;
  };

  authService.getContentRegions = function () {
    var regions = Session.contentRegions;
    regions = regions == "" ? "[]" : regions;
    return JSON.parse(regions);
  };

  authService.getValidationRegions = function () {
    var regions = Session.validationRegions;
    regions = regions == "" ? "[]" : regions;
    return JSON.parse(regions);
  };

  authService.logout = function() {
    Session.destroy();
  };

  return authService;
}])