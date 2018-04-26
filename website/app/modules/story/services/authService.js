'use strict';

/**
 * @ngdoc service
 * @name ResourceForceAuthoringTool.Auth
 * @description
 * # Auth
 * Service in the ResourceForceAuthoringTool.
 */
angular.module('resourceForceAuthoringTool').factory('AuthService', function ($http, Session) {
  var authService = {};
 
  authService.login = function (id, name, type, allowedLocations) {
    Session.create( id, name, type, allowedLocations);
  };
 
  authService.loginWithCookies = function (cookies){
    Session.create(cookies["id"], cookies["name"], cookies["type"], cookies["allowedLocations"])
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

  authService.getAllowedLocations = function () {
    return Session.userAllowedLocations;
  };

  authService.logout = function() {
    Session.destroy();
  };

  return authService;
})