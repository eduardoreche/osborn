(function() {
    'use strict';

    angular
        .module('osborn.team')
        .factory('TeamService', teamService);

    teamService.inject = ['$resource', 'SERVER_DATA'];

    function teamService($resource, SERVER_DATA) {

        const service = $resource(`http://${SERVER_DATA.ip}:${SERVER_DATA.port}/api/v1/teams/:id`, {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });        
        return service;
    }
})();