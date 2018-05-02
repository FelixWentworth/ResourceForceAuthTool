'use strict';

/**
 * @ngdoc service
 * @name ResourceForceAuthoringTool.Cookies
 * @description
 * # Cookies
 * Service in the ResourceForceAuthoringTool.
 */
angular
    .module('resourceForceAuthoringTool')
    .service('CookieService', [ "$cookies", function ($cookies) {
    var cookies = {};
        
    cookies.set = function(id, name, type, contentRegions, validationRegions)
    {
         $cookies.put("id", id);
         $cookies.put("name", name);
         $cookies.put("type", type);      
         $cookies.put("contentRegions", contentRegions);
         $cookies.put("validationRegions", validationRegions);       
    };

    cookies.exists = function()
    {
        var allCookies = $cookies.getAll();
        return Object.keys(allCookies).length > 0 && $cookies.get("id") != null;
    }

    cookies.get = function()
    {
        return $cookies.getAll();
    };

    cookies.remove = function(){
         $cookies.remove("id");
         $cookies.remove("name");
         $cookies.remove("type");
         $cookies.remove("contentRegions");
         $cookies.remove("validationRegions");
    };

    return cookies;
}]);