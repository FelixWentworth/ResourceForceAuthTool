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

    // return $http
    //   .post('/login', credentials)
    //   .then(function (res) {
    //     Session.create(res.data.id, res.data.user.id,
    //                    res.data.user.role);
    //     return res.data.user;
    //   });
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