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
 
  authService.login = function (id, name, type, languages, locations) {
    Session.create( id, name, type, languages, locations);
  };
 
  authService.loginWithCookies = function (cookies){
    Session.create(cookies["id"], cookies["name"], cookies["type"], cookies["languages"], cookies["location"])
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

  authService.getLocations = function () {
    return Session.userLocations;
  };

  authService.getLanguages = function () {
    return Session.userLanguages;
  };

  return authService;
})