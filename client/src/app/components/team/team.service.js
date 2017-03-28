(function() {
    'use strict';

    angular
        .module('osborn.team')
        .factory('TeamService', teamService);

    teamService.inject = ['$resource'];

    function teamService($resource) {

        const service = $resource('/api/v1/teams/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });        
        return service;
    }
})();