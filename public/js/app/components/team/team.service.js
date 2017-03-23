(function() {
    'use strict';

    angular
        .module('osborn.team')
        .factory('teamService', teamService);

    teamService.inject = ['$resource', '$http'];

    function teamService($resource, $http) {

        var service = $resource('/api/v1/teams/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
        
        return service;
    }
})();