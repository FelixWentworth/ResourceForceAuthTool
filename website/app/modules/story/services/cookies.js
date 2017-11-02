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
    .service('CookieService', function () {
    var cookies = {};
        
    cookies.set = function(id, name, type)
    {
         //$cookies.set("id", id);
         //$cookies.set("name", name);
         //$cookies.set("type", type);    
    };

    cookies.get = function(name)
    {
        //return $cookies.get(name);
    };

    cookies.remove = function(){
         //$cookies.remove("id");
         //$cookies.remove("name");
         //$cookies.remove("type");
    };

    cookies.test = function() {
        return "test";
    }
    return cookies;
});