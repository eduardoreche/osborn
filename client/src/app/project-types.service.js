(function() {
    'use strict';

    angular
        .module('appServices')
        .factory('ProjectTypesService', projectTypesService);

    projectTypesService.inject = ['$resource', '$http', SERVER_DATA];

    function projectTypesService($resource, $http, SERVER_DATA) {
        
        $http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('id_token')}`;

        const service = $resource(`http://${SERVER_DATA.ip}:${SERVER_DATA.port}/api/v1/project-types`);
        
        return service;
    }
})();