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
        
    cookies.set = function(id, name, type, languages, locations)
    {
         $cookies.put("id", id);
         $cookies.put("name", name);
         $cookies.put("type", type);    
         $cookies.put("languages", languages);    
         $cookies.put("locations", locations);    
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
         $cookies.remove("languages");
         $cookies.remove("locations");
    };

    return cookies;
}]);