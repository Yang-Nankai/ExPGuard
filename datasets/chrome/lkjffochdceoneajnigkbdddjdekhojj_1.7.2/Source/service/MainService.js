"use strict";
angular.module('Service.Main',[])
    .factory('$mainService',['$http',function($http){
        var service = {};
    service.search = function (keyWord, callback) {
        if (keyWord == "") {
            callback({status : 400})
        } else {
            $http({
                method: 'GET',
                url: "https://www.google.com/complete/search",
                params: {
                    client: "firefox",
                    ie: "utf-8",
                    oe: "utf-8",
                    hl: "en-US",
                    gl: "",
                    q: keyWord == "" ? "" : keyWord
                }
            }).then(function successCallback(response) {
                callback(response);
            }, function errorCallback(response) {
                callback(response);
            });
        }
    }
    return service;

    }]);
